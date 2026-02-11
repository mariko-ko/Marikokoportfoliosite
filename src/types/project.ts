export interface Project {
  id: number;
  title: string;
  category: string;
  description: string | Array<{ title: string; imageUrl: string }>;
  imageUrl: string;
  illustrationImages?: string[];
  galleryImages?: string[];
  galleryTitle?: string;
  galleries?: Array<{ title?: string; images: string[]; sourceUrl?: string }>;
  verticalGalleryImages?: string[];
  verticalGalleryTitle?: string;
  conceptSections?: Array<{ 
    title: string; 
    description: string | Array<{ subtitle: string; content: string }>; 
    imageUrl?: string;
    imageCaption?: string;
    gridImages?: string[];
    gridImagesDescription?: string;
    leftColumnMedia?: Array<{ type: 'image' | 'video'; url: string; staticUrl?: string; caption?: string; duration?: number }>;
    fullWidthImageUrl?: string;
    fullWidthImageCaption?: string;
    fullWidthImageExpand?: boolean;
    fullWidthTable?: {
      caption?: string;
      headers: string[];
      rows: Array<{ header: string; cells: string[] }>;
      description?: string;
    };
    roles?: string[] 
  }>;
  conceptSectionsStyle?: 'separate' | 'unified';
  role: string;
  period: string;
  tools: string[];
  phases?: Array<{ name: string; handled: boolean }>;
  phaseStyle?: 'box' | 'arrow';
  phasesTitle?: string;
  team?: Array<{ role: string; count: number | string }>;
  challenge?: string | string[];
  challengeTitle?: string;
  purpose?: string | string[];
  purposeTitle?: string;
  purposeImageUrl?: string;
  purposeImageCaption?: string;
  processImageUrl?: string;
  processTitle?: string;
  keyPoints?: string[];
  keyPointsTitle?: string;
  keyPointsImage?: string;
  achievements?: string[];
  achievementsTitle?: string;
  projectUrl?: string | string[];
  hidden?: boolean;
}