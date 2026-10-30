import React from 'react';
import MinimalProfessionalTemplate from './MinimalProfessionalTemplate';
import ModernDeveloperTemplate from './ModernDeveloperTemplate';
import CreativeDesignerTemplate from './CreativeDesignerTemplate';
import StudentPortfolioTemplate from './StudentPortfolioTemplate';
import ProfessionalExecutiveTemplate from './ProfessionalExecutiveTemplate';
import TechBentoTemplate from './TechBentoTemplate';
import TerminalHackerTemplate from './TerminalHackerTemplate';
import NeoBrutalistTemplate from './NeoBrutalistTemplate';
import EditorialMagazineTemplate from './EditorialMagazineTemplate';
import StartupFounderTemplate from './StartupFounderTemplate';

export const TemplateRenderer = ({
  portfolio,
  templateId,
  themeColor,
  fontFamily,
  onDownloadResume,
}) => {
  const chosenTemplateId =
    templateId || portfolio?.profile?.templateId || portfolio?.templateId || 'minimal-pro';
  const chosenThemeColor =
    themeColor || portfolio?.profile?.themeColor || portfolio?.themeColor || 'indigo';
  const chosenFontFamily =
    fontFamily || portfolio?.profile?.fontFamily || portfolio?.fontFamily || 'sans';

  const props = {
    portfolio,
    themeColor: chosenThemeColor,
    fontFamily: chosenFontFamily,
    onDownloadResume,
  };

  switch (chosenTemplateId) {
    case 'modern-dev':
      return <ModernDeveloperTemplate {...props} />;
    case 'creative-designer':
      return <CreativeDesignerTemplate {...props} />;
    case 'student':
      return <StudentPortfolioTemplate {...props} />;
    case 'executive':
      return <ProfessionalExecutiveTemplate {...props} />;
    case 'bento-grid':
      return <TechBentoTemplate {...props} />;
    case 'terminal-hacker':
      return <TerminalHackerTemplate {...props} />;
    case 'neo-brutalist':
      return <NeoBrutalistTemplate {...props} />;
    case 'editorial-magazine':
      return <EditorialMagazineTemplate {...props} />;
    case 'startup-founder':
      return <StartupFounderTemplate {...props} />;
    case 'minimal-pro':
    default:
      return <MinimalProfessionalTemplate {...props} />;
  }
};

export default TemplateRenderer;
