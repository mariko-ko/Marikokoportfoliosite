import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Layers,
  Lightbulb,
  TrendingUp,
  Flag,
  Boxes,
  X,
  GitBranch,
  Hourglass,
  ChevronDown,
} from "lucide-react";
import { Project } from "../types/project";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GifPlayer } from "./GifPlayer";
import React from "react";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

// テキストをパースして改行とボールドを適用する関数
function parseText(text: string) {
  // 改行で分割
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    // **text** をボールドに変換
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(line)) !== null) {
      // マッチ前のテキスト
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      // ボールドテキスト
      parts.push(<strong key={`bold-${lineIndex}-${match.index}`}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    
    // 残りのテキスト
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }
    
    return (
      <span key={lineIndex}>
        {parts.length > 0 ? parts : line}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({});

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Work</span>
          </button>
        </div>
      </motion.div>

      {/* Hero Image */}
      {project.id !== 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-20 mb-8 px-6"
        >
          <div className="max-w-[980px] mx-auto">
            <ImageWithFallback
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      )}

      {/* Illustration Layout */}
      {project.illustrationImages && project.illustrationImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 px-6"
        >
          {project.illustrationImages.length === 2 ? (
            // 2-column layout: equal size
            <div className="max-w-[980px] mx-auto grid grid-cols-2 gap-8 items-center">
              {project.illustrationImages.map((imgSrc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(imgSrc)}
                >
                  <ImageWithFallback
                    src={imgSrc}
                    alt={`${project.title} illustration ${index + 1}`}
                    className="w-full h-auto hover:opacity-90 transition-opacity"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            // 3-column layout: center larger, sides smaller
            <div className="max-w-[980px] mx-auto grid grid-cols-3 gap-6 items-end">
              {project.illustrationImages.map((imgSrc, index) => {
                const sizeClass = index === 1
                  ? 'col-span-1'
                  : 'col-span-1 scale-90';

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className={`${sizeClass} cursor-pointer`}
                    onClick={() => setSelectedImage(imgSrc)}
                  >
                    <ImageWithFallback
                      src={imgSrc}
                      alt={`${project.title} illustration ${index + 1}`}
                      className="w-full h-auto hover:opacity-90 transition-opacity"
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* Content */}
      <div className={`max-w-[980px] mx-auto px-6 pb-24 ${project.id === 6 ? 'mt-32' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm tracking-wider text-gray-500 uppercase mb-4">
            {project.category}
          </p>
          <h1 className="mb-8 text-4xl md:text-5xl lg:text-6xl">{project.title}</h1>
          {typeof project.description === 'string' ? (
            <p className="text-xl text-gray-600 mb-24 leading-relaxed">
              {parseText(project.description)}
            </p>
          ) : (
            <div className="mb-24 space-y-12">
              {project.description.map((item, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl">{item.title}</h3>
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Project Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-20 pb-20 border-b border-gray-200"
        >
          <div>
            <h3 className="mb-3 text-lg font-medium">Role</h3>
            <p className="text-gray-600">{project.role}</p>
          </div>

          {project.team && project.team.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-medium">Team</h3>
              <div className="flex flex-wrap gap-2">
                {project.team.map((member) => (
                  <span
                    key={member.role}
                    className="px-4 py-2 bg-gray-100 text-sm"
                  >
                    {member.role} {typeof member.count === 'number' ? `${member.count}名` : member.count}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-3 text-lg font-medium">Timeline</h3>
            <p className="text-gray-600">{project.period}</p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-medium">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 bg-gray-100 text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {project.projectUrl && (
            <div className="md:col-span-2">
              <h3 className="mb-3 text-lg font-medium">URL</h3>
              {Array.isArray(project.projectUrl) ? (
                <ul className="space-y-2">
                  {project.projectUrl.map((url, index) => {
                    // URLから表示テキストを判別
                    let linkText = url;
                    if (url.includes('play.google.com')) {
                      linkText = 'Google Play';
                    } else if (url.includes('apps.apple.com')) {
                      linkText = 'App Store';
                    } else if (url.includes('github.com')) {
                      linkText = 'GitHub';
                    } else {
                      // その他の場合はドメイン名を抽出
                      try {
                        const domain = new URL(url).hostname.replace('www.', '');
                        linkText = domain;
                      } catch {
                        linkText = url;
                      }
                    }
                    
                    return (
                      <li key={index} className="flex gap-3">
                        <span className="text-black">•</span>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-black transition-colors underline"
                        >
                          {linkText}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors underline"
                >
                  {project.projectUrl}
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* Challenge */}
        {project.challenge && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-30"
          >
            <h2 className="mb-6 flex items-center gap-2 text-2xl">
              <Hourglass className="w-6 h-6" />
              {project.challengeTitle || '背景'}
            </h2>
            {Array.isArray(project.challenge) ? (
              <div className="text-gray-600 leading-relaxed text-lg space-y-4">
                {project.challenge.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 leading-relaxed text-lg">
                {project.challenge}
              </p>
            )}
          </motion.div>
        )}

        {/* Purpose */}
        {project.purpose && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-30"
          >
            <h2 className="mb-6 flex items-center gap-2 text-2xl">
              <Flag className="w-6 h-6" />
              {project.purposeTitle || 'プロジェクトの目的'}
            </h2>
            <div className={project.purposeImageUrl ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-start" : ""}>
              <div>
                {Array.isArray(project.purpose) ? (
                  <ul className="space-y-3">
                    {project.purpose.map((item, index) => (
                      <li key={index} className="text-gray-600 leading-relaxed text-lg flex gap-3">
                        <span className="text-black">•</span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {project.purpose}
                  </p>
                )}
              </div>
              {project.purposeImageUrl && (
                <div className="relative">
                  <ImageWithFallback
                    src={project.purposeImageUrl}
                    alt={project.purposeTitle || 'プロジェクトの目的'}
                    className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity rounded"
                    onClick={() => setSelectedImage(project.purposeImageUrl!)}
                  />
                  {project.purposeImageCaption && (
                    <p className="text-xs text-gray-500 mt-2">{project.purposeImageCaption}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Phases */}
        {project.phases && project.phases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-30"
          >
            <h2 className="mb-8 flex items-center gap-2 text-2xl">
              <Layers className="w-6 h-6" />
              {project.phasesTitle || '担当フェーズ'}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {project.phases.map((phase) => {
                const isArrowStyle = project.phaseStyle === 'arrow' || !project.phaseStyle;

                return (
                  <div
                    key={phase.name}
                    className={`py-3 text-sm text-left ${
                      isArrowStyle ? 'pl-6 pr-10' : 'px-6'
                    } ${
                      phase.handled
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    style={
                      isArrowStyle
                        ? {
                            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                          }
                        : undefined
                    }
                  >
                    {phase.name}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Process */}
        {(project.processImageUrl || (project.conceptSections && project.conceptSections.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={(project.processImageUrl || (project.conceptSections && project.conceptSections.length > 0)) ? "mb-30" : "mb-16"}
          >
            <h2 className="mb-8 flex items-center gap-2 text-2xl">
              {project.conceptSectionsStyle === 'unified' ? (
                <GitBranch className="w-6 h-6" />
              ) : (
                <Boxes className="w-6 h-6" />
              )}
              {project.processTitle || 'プロセス'}
            </h2>
            {project.processImageUrl && (
              <div className="bg-gray-100 overflow-hidden mb-8">
                <ImageWithFallback
                  src={project.processImageUrl}
                  alt="Work Process"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Concept Sections - プロセスの子要素として表示 */}
            {project.conceptSections && project.conceptSections.length > 0 && (
              <div className="mt-12 relative">
                {/* Timeline for id 1 and 4 only */}
                {(project.id === 1 || project.id === 4) && project.conceptSections.length > 1 && (
                  <div className="absolute left-1/2 top-16 bottom-16 w-[1px] bg-gray-300 -translate-x-1/2 hidden md:block" />
                )}
                
                <div className="space-y-8">
                  {project.conceptSections.map((section, index) => (
                    <div key={index} className="bg-white p-8 md:p-12 shadow-sm relative">
                      <div className={section.imageUrl ? "grid md:grid-cols-2 gap-12 items-start" : ""}>
                        {/* Left Column - Text and Media */}
                        <div>
                          <h3 className="mb-6 pt-1 text-xl whitespace-pre-line">{section.title}</h3>
                          {section.roles && section.roles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {section.roles.map((role, roleIndex) => (
                                <span
                                  key={roleIndex}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          )}
                          {typeof section.description === 'string' ? (
                            <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                              {parseText(section.description)}
                            </p>
                          ) : (
                            <div className="space-y-6">
                              {section.description.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                  <h4 className="font-medium text-gray-900 mb-2 pl-4 border-l-2 border-gray-900">{item.subtitle}</h4>
                                  <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                                    {parseText(item.content)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Left Column Media below description */}
                          {section.leftColumnMedia && section.leftColumnMedia.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 mt-8">
                              {section.leftColumnMedia.map((media, mediaIndex) => {
                                // Check if it's a Google Drive link
                                const isGoogleDrive = media.url.includes('drive.google.com');
                                
                                // Extract file ID from Google Drive URL for images/GIFs
                                let fileId = '';
                                if (isGoogleDrive) {
                                  const fileIdMatch = media.url.match(/\/d\/([^\/]+)/);
                                  if (fileIdMatch) {
                                    fileId = fileIdMatch[1];
                                  }
                                }

                                const googleDriveEmbedUrl = isGoogleDrive && media.type === 'video'
                                  ? media.url.replace('/view?usp=drive_link', '/preview').replace('/view?usp=sharing', '/preview')
                                  : media.url;

                                return (
                                  <React.Fragment key={mediaIndex}>
                                    {media.type === 'video' ? (
                                      <div className="max-w-[250px]">
                                        {media.caption && (
                                          <p className="text-xs text-gray-500 mb-2">{media.caption}</p>
                                        )}
                                        {isGoogleDrive ? (
                                          <iframe
                                            src={googleDriveEmbedUrl}
                                            className="w-full aspect-video"
                                            allow="autoplay"
                                          />
                                        ) : (
                                          <video
                                            src={media.url}
                                            controls
                                            className="w-full h-auto"
                                            playsInline
                                          />
                                        )}
                                      </div>
                                    ) : isGoogleDrive && fileId ? (
                                      // Google Drive GIF - use iframe to display animated GIF
                                      <div className="max-w-[250px]">
                                        <div className="relative w-full" style={{ paddingBottom: '133%' }}>
                                          <iframe
                                            src={`https://drive.google.com/file/d/${fileId}/preview`}
                                            className="absolute top-0 left-0 w-full h-full border-0"
                                            allow="autoplay"
                                          />
                                        </div>
                                        {media.caption && (
                                          <p className="text-xs text-gray-500 mt-2">{media.caption}</p>
                                        )}
                                      </div>
                                    ) : (
                                      // Regular image/GIF - ループ再生
                                      <div className="max-w-[250px]">
                                        <img
                                          src={media.url}
                                          alt={`${section.title} - ${mediaIndex + 1}`}
                                          className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                                          onClick={() => setSelectedImage(media.url)}
                                        />
                                        {media.caption && (
                                          <p className="text-xs text-gray-500 mt-2">{media.caption}</p>
                                        )}
                                      </div>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Right Column - Image (if exists) */}
                        {section.imageUrl && (
                          <div>
                            <ImageWithFallback
                              src={section.imageUrl}
                              alt={section.title}
                              className={
                                section.imageUrl.toString().includes('3b9481c455162245e7f96521d45924a73c2e08d0') ||
                                section.imageUrl.toString().includes('5a9b3b3a0d83640f48475243422841214e182d73')
                                  ? 'w-full max-w-md h-auto mx-auto'
                                  : 'w-full h-auto'
                              }
                            />
                            {section.imageCaption && (
                              <p className="text-sm text-gray-600 mt-2">
                                {section.imageCaption}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Full Width Image below description */}
                      {section.fullWidthImageUrl && (
                        <div className="mt-8">
                          {section.fullWidthImageExpand ? (
                            <div>
                              <button
                                onClick={() => toggleSection(index * 1000)} // Use index * 1000 to create unique key for fullWidthImage
                                className="flex items-center gap-2 text-sm text-gray-600 mb-2 hover:text-gray-900 transition-colors"
                              >
                                <ChevronDown 
                                  className={`w-4 h-4 transition-transform ${expandedSections[index * 1000] ? 'rotate-180' : ''}`}
                                />
                                <span>{section.fullWidthImageCaption || '詳細を表示'}</span>
                              </button>
                              {expandedSections[index * 1000] && (
                                <div>
                                  <ImageWithFallback
                                    src={section.fullWidthImageUrl}
                                    alt={`${section.title} - detail`}
                                    className="w-full h-auto"
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <>
                              {section.fullWidthImageCaption && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {section.fullWidthImageCaption}
                                </p>
                              )}
                              <ImageWithFallback
                                src={section.fullWidthImageUrl}
                                alt={`${section.title} - detail`}
                                className="w-full h-auto"
                              />
                            </>
                          )}
                        </div>
                      )}

                      {/* Grid Images - 2x2 layout with click to expand */}
                      {section.gridImages && section.gridImages.length > 0 && (
                        <div className="mt-8">
                          {section.gridImagesDescription && (
                            <p className="text-sm text-gray-600 mb-4">
                              {section.gridImagesDescription}
                            </p>
                          )}
                          <div className="grid grid-cols-2 gap-4">
                            {section.gridImages.map((image, imgIndex) => (
                              <div 
                                key={imgIndex}
                                className="cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setSelectedImage(image)}
                              >
                                <ImageWithFallback
                                  src={image}
                                  alt={`${section.title} - ${imgIndex + 1}`}
                                  className="w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Full Width Table */}
                      {section.fullWidthTable && (
                        <div className="mt-8 overflow-x-auto">
                          {section.fullWidthTable.caption && (
                            <p className="text-sm text-gray-600 mb-4">
                              {section.fullWidthTable.caption}
                            </p>
                          )}
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-3 py-2 text-left font-medium min-w-[120px]"></th>
                                {section.fullWidthTable.headers.map((header, headerIndex) => (
                                  <th key={headerIndex} className="border border-gray-300 px-3 py-2 text-left font-medium min-w-[180px]">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.fullWidthTable.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <td className="border border-gray-300 px-3 py-2 font-medium bg-gray-50">
                                    {row.header}
                                  </td>
                                  {row.cells.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border border-gray-300 px-3 py-2 text-gray-600 whitespace-pre-line align-top">
                                      {parseText(cell)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {section.fullWidthTable.description && (
                            <p className="mt-3 text-[16px] text-[#4a5565]">
                              {section.fullWidthTable.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Key Points */}
        {project.keyPoints && project.keyPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={project.achievements && project.achievements.length > 0 ? "mb-30" : "mb-30"}
          >
            <h2 className="mb-8 flex items-center gap-2 text-2xl">
              <Lightbulb className="w-6 h-6" />
              {project.keyPointsTitle || '工夫した点'}
            </h2>
            <div className="text-gray-600 leading-normal text-lg whitespace-pre-line mb-8">
              {project.keyPoints.join('\n')}
            </div>
            {project.keyPointsImage && (
              <div className="w-full cursor-pointer" onClick={() => setSelectedImage(project.keyPointsImage!)}>
                <ImageWithFallback
                  src={project.keyPointsImage}
                  alt={project.keyPointsTitle || '工夫した点'}
                  className="w-full h-auto"
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Vertical Gallery - Horizontal Scroll */}
        {project.verticalGalleryImages && project.verticalGalleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.625 }}
            className="mb-30"
          >
            <h2 className="mb-8 flex items-center gap-2 text-2xl">
              <Layers className="w-6 h-6" />
              {project.verticalGalleryTitle || 'Gallery'}
            </h2>
            <div className="relative overflow-hidden">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
              
              <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <div className="flex gap-8 pb-6 pl-12 pr-12">
                  {project.verticalGalleryImages.map((imageUrl, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      className="flex-shrink-0"
                    >
                      <div className="relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-500">
                        <ImageWithFallback
                          src={imageUrl}
                          alt={`${project.verticalGalleryTitle || 'Gallery'} ${index + 1}`}
                          className="w-auto object-contain"
                          style={{ height: '300px' }}
                          onClick={() => setSelectedImage(imageUrl)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mb-30"
          >
            <h2 className="mb-8 flex items-center gap-2 text-2xl">
              <TrendingUp className="w-6 h-6" />
              {project.achievementsTitle || '成果や実績'}
            </h2>
            <ul className="space-y-3">
              {project.achievements.map((item, index) => (
                <li key={index} className="text-gray-600 leading-relaxed text-lg flex gap-3">
                  <span className="text-black mt-1">•</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Gallery Grid */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-2xl">
              {project.galleryTitle || '作品集'}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {project.galleryImages.map((imgSrc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  className="aspect-square overflow-hidden bg-gray-100"
                >
                  <ImageWithFallback
                    src={imgSrc}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Multiple Galleries */}
        {project.galleries && project.galleries.length > 0 && (
          <>
            {project.galleries.map((gallery, galleryIndex) => (
              <motion.div
                key={galleryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + galleryIndex * 0.1 }}
                className="mb-16"
              >
                {gallery.title && (
                  <h2 className="mb-8 text-2xl">
                    {gallery.title}
                  </h2>
                )}
                <div className={`grid gap-4 ${gallery.images.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {gallery.images.map((imgSrc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + galleryIndex * 0.1 + index * 0.05 }}
                      className="overflow-hidden cursor-pointer group"
                      style={gallery.images.length === 1 ? {} : { aspectRatio: '1', minHeight: '200px' }}
                      onClick={() => setSelectedImage(imgSrc)}
                    >
                      <ImageWithFallback
                        src={imgSrc}
                        alt={`${gallery.title || project.title} gallery ${index + 1}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
                {gallery.sourceUrl && (
                  <div className="mt-4 text-sm text-gray-500">
                    <a 
                      href={gallery.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-gray-700 transition-colors inline-flex items-center gap-1"
                    >
                      <span>URL:</span>
                      <span className="underline">{gallery.sourceUrl}</span>
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </>
        )}

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center pt-12"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-4 border border-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Work
          </button>
        </motion.div>
      </div>
    </div>
  );
}