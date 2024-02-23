import { Inter, Lusitana } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const lusitana = Lusitana({ weight: ['400', '700'], subsets: ['latin'] });

const fonts = { inter, lusitana };

export default fonts;
