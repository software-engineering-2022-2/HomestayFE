import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    homestay_id: params.id
  };
};