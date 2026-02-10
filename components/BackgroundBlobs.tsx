import React from 'react';

// Animation #9: Morphing blobs
const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
      {/* Blob 1 */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-electric/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
      
      {/* Blob 2 */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-mint/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
      
      {/* Blob 3 */}
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />
    </div>
  );
};

export default BackgroundBlobs;