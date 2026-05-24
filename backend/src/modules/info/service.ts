import { InfoResponse } from './schema';

export const getInfo = (): InfoResponse => {
  return {
    firstName: 'Valentin',
    lastName: 'Bassot',
    cursus: '1st year student at Epitech, Cybersecurity specialization',
    description: 'Currently in my 1st year at Epitech, I am passionate about cybersecurity and web development. My studies allow me to explore the use of AI while maintaining constant vigilance over security challenges. Motivated by the rapid evolution of technologies, I aim to bring my fresh perspective and commitment to an innovative structure.',
  };
};