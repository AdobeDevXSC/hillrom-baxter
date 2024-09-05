import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Select all <a> elements within the footer
  const footerLinks = footer.querySelectorAll('a');
  footerLinks.forEach(link => {
    link.setAttribute('target', '_blank');

    const hasIcon = link.querySelector('img');
    if (hasIcon) {
     const title = hasIcon.getAttribute('data-icon-name');
     link.setAttribute('title', title);
    }
  });

  block.append(footer);
}
