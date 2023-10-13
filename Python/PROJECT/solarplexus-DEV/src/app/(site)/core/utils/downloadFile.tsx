import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function downloadFile(filePath: string) {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  // Get the public URL of the file based on the filePath
  const { data  
} = supabase.storage.from('files').getPublicUrl(filePath);

  try {
    const response = await fetch(data.publicUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    const blob = await response.blob();

    // Create a blob URL and trigger the download
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    // @ts-ignore
    link.download = filePath.split('/').pop(); // Set the file name for download

    // Programmatically trigger the click event
    link.click();

    // Clean up the blob URL
    URL.revokeObjectURL(blobURL);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

