export interface ProfileData {
  name: string;
  role: string;
  bio: string;
}

export async function fetchProfile(): Promise<ProfileData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL environment variable is not set');
    return {
      name: '',
      role: '',
      bio: '',
    };
  }
  
  try {
    const res = await fetch(`${apiUrl}/info`);
    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }
    const data = await res.json();
    
    return {
      name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      role: data.cursus || '',
      bio: data.description || '',
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      name: '',
      role: '',
      bio: '',
    };
  }
}
