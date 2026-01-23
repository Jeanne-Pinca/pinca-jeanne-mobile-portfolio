export const PROFILE = {
  name: 'piuriem',
  bio: 'Passionate in bridging technology and art, bringing ideas to life through both creative design and functional development. Always eager to grow, and face challenges with curiosity and enthusiasm. ',
  avatar: require('../../assets/photos/Piuriem_Icon_pfp300x300.png'),
  skills: ['React Native', 'React', 'HTML', 'TypeScript', 'C#', 'CSS', 'Python', 'JavaScript'], // CODING SKILLS
  artSkills: ['Photoshop', 'Clip Studio Paint', 'Procreate', 'Blender', 'Figma'], // ART SKILLS
  email: 'jeanne.pinca@email.com',
  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jeanne-pinca/', icon: require('../../assets/png/linkedin.png') },
    { label: 'Twitter', url: 'https://twitter.com/d_piuriem', icon: require('../../assets/png/X.png')},
    { label: 'Tumblr', url: 'https://tumblr.com/piuriem', icon: require('../../assets/png/tumblr.png') },
    { label: 'Instagram', url: 'https://www.instagram.com/piuriem/', icon: require('../../assets/png/instagram.png') },
  ],
  codingProjects: [
    { 
      id: '1', 
      name: 'LUMEN', 
      description: 'A 2D platformer game that follows the story of a lighthouse keeper Lumen in her adventures to restore light to her island.',
      url: 'https://github.com/Jeanne-Pinca/LUMEN',
      technologies: ['C#', 'ShaderLab', 'HLSL'],
      image: 'https://placeholder-image-url.com/lumen.jpg'
    },
    { 
      id: '2', 
      name: 'Starmu', 
      description: 'A web game on taking care of your shining companion.',
      url: 'https://github.com/MariahAndrea/final-project-group4-webdevt-frontend',
      technologies: ['JavaScript', 'CSS', 'HTML'],
      image: 'https://placeholder-image-url.com/starmu.jpg'
    },
    { 
      id: '3', 
      name: 'Aswang Hunter', 
      description: 'A simple text-based web game inspired by Filipino folklore.',
      url: 'https://midterm-project-n64v-itwq1qyqs-jeannes-projects-cb68f724.vercel.app/',
      technologies: ['JavaScript', 'CSS', 'HTML'],
      image: 'https://placeholder-image-url.com/aswang.jpg'
    },
  ],
  artProjects: [
    { 
      id: 'art1', 
      name: 'The Moon Maiden', 
      description: 'Recent Artwork - Digital Painting inspired by Genshin Impact\'s character, Columbina.',
      url: 'https://your-art-portfolio-url.com',
      image: 'https://64.media.tumblr.com/a432c5914fcbff3ed0a2026ff202a9ad/cc5851f138221032-64/s2048x3072/b789e5e5eb35326355784e8da2a1b7c2f3e2b1a3.jpg'
    },
    { 
      id: 'art2', 
      name: 'Deer Diary', 
      description: 'A For-profit zine featuring original illustrations and short stories about Heizou from Genshin Impact, Collaborated with other illustrators, layout artists, and writers.',
      url: 'https://deerzou-zine.carrd.co/',

      image: 'https://pbs.twimg.com/media/GLSchsyWIAA2U6A?format=jpg&name=large'
    },
    { 
      id: 'art3', 
      name: 'Character Design Exploration', 
      description: 'Character Designs for DeerZou',
      url: 'https://your-art-portfolio-url.com',
      image: 'https://i.imgur.com/snyJsaD.png'
    },
  ],
};