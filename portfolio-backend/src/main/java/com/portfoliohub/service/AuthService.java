package com.portfoliohub.service;

import com.portfoliohub.dto.AuthResponse;
import com.portfoliohub.dto.LoginRequest;
import com.portfoliohub.dto.RegisterRequest;
import com.portfoliohub.dto.UserDto;
import com.portfoliohub.entity.Profile;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.BadRequestException;
import com.portfoliohub.repository.ProfileRepository;
import com.portfoliohub.repository.UserRepository;
import com.portfoliohub.security.JwtTokenProvider;
import com.portfoliohub.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       ProfileRepository profileRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String username = request.getUsername().trim().toLowerCase();
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByUsername(username)) {
            throw new BadRequestException("Username is already taken");
        }

        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setPublished(false);

        User savedUser = userRepository.save(user);

        // Initialize empty profile with provided full name
        Profile profile = new Profile(savedUser);
        profile.setFullName(request.getFullName() != null && !request.getFullName().isBlank()
                ? request.getFullName().trim() : username);
        profile.setEmail(email);
        profileRepository.save(profile);

        String token = tokenProvider.generateTokenFromUsernameAndId(savedUser.getUsername(), savedUser.getId());

        UserDto userDto = new UserDto(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.isPublished(),
                profile.getFullName(),
                profile.getAvatarUrl()
        );

        return new AuthResponse(token, userDto);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String identifier = request.getEmail().trim().toLowerCase();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(identifier, request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));

        Profile profile = profileRepository.findByUser(user).orElse(null);

        UserDto userDto = new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.isPublished(),
                profile != null ? profile.getFullName() : user.getUsername(),
                profile != null ? profile.getAvatarUrl() : null
        );

        return new AuthResponse(token, userDto);
    }

    @Transactional(readOnly = true)
    public UserDto getCurrentUser(UserPrincipal principal) {
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));

        Profile profile = profileRepository.findByUser(user).orElse(null);

        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.isPublished(),
                profile != null ? profile.getFullName() : user.getUsername(),
                profile != null ? profile.getAvatarUrl() : null
        );
    }
}

