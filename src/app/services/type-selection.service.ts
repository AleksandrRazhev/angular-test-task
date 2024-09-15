import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeSelectionService {
  id: string | null = null;
  setId(id: string | null) {
    return (this.id = id);
  }
}
