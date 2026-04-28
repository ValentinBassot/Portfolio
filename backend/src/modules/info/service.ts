import { InfoResponse } from './schema';

export const getInfo = (): InfoResponse => {
  return {
    firstName: 'Valentin',
    lastName: 'Bassot',
    cursus: '1ère année à Epitech, spécialisation CyberSécurité',
    description: 'Passionné par l\'informatique et la cybersécurité, je suis un étudiant en première année à Epitech. Je m\'intéresse particulièrement à la sécurité des systèmes et des réseaux, et je suis constamment à la recherche de nouvelles connaissances dans ce domaine en constante évolution.',
  };
};