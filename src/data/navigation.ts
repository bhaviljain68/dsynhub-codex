export type NavLink = {
  label: string;
  href: string;
  match?: string;
};

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/', match: '/' },
  { label: 'Case Study', href: '/case-study' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services/branding', match: '/services' },
  { label: 'Portfolio', href: '/portfolio/branding-portfolio', match: '/portfolio' },
];

export const footerNav: NavLink[] = [
  { label: 'Branding Services', href: '/services/branding', match: '/services/branding' },
  { label: 'Advertising', href: '/services/advertising', match: '/services/advertising' },
  { label: 'Influencer Marketing', href: '/services/influencer-marketing', match: '/services/influencer-marketing' },
  { label: 'Film Production', href: '/services/film', match: '/services/film' },
  { label: 'Portfolio Hub', href: '/portfolio/branding-portfolio', match: '/portfolio' },
];

export const contactEmail = 'hello@dsynhub.com';
