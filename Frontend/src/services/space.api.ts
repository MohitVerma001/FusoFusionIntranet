import { httpService } from './http.service';
import { Space } from '../database/schema';

interface SpacesResponse {
  status: string;
  data: {
    spaces: Space[];
  };
}

interface SpaceResponse {
  status: string;
  data: {
    space: Space;
  };
}

export const spaceApi = {
  async getAllSpaces(filters?: {
    visibility?: 'public' | 'private';
    parent_space_id?: string | null;
  }): Promise<SpacesResponse> {
    return httpService.get<SpacesResponse>('/spaces', { params: filters });
  },

  async getSpaceById(id: string): Promise<SpaceResponse> {
    return httpService.get<SpaceResponse>(`/spaces/${id}`);
  },
};
