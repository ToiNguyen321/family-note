import { Person } from '@/types';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type FamilyStateData = {
  members: Person[];
};

type FamilyStateActions = {
  setMembers: (members: Person[]) => void;
  addMember: (person: Person) => void;
  updateMember: (personId: string, updates: Partial<Person>) => void;
  deleteMember: (personId: string) => void;
};

type FamilyState = FamilyStateData & FamilyStateActions;

export const useFamilyStore = create<FamilyState>(set => ({
  members: [],
  setMembers: members => set({ members }),
  addMember: person => set(state => ({ members: [...state.members, person] })),
  updateMember: (personId, updates) =>
    set(state => ({
      members: state.members.map(p =>
        p.id === personId ? { ...p, ...updates } : p,
      ),
    })),
  deleteMember: personId =>
    set(state => ({
      members: state.members.filter(p => p.id !== personId),
    })),
}));

export const useFamilySelectors = () =>
  useFamilyStore(
    useShallow(state => ({
      members: state.members,
      setMembers: state.setMembers,
      addMember: state.addMember,
      updateMember: state.updateMember,
      deleteMember: state.deleteMember,
    })),
  );

export const useMembersSelector = () =>
  useFamilyStore(useShallow(state => state.members));

export const useSetMembersSelector = () =>
  useFamilyStore(useShallow(state => state.setMembers));

export const useAddMemberSelector = () =>
  useFamilyStore(useShallow(state => state.addMember));

export const useUpdateMemberSelector = () =>
  useFamilyStore(useShallow(state => state.updateMember));

export const useDeleteMemberSelector = () =>
  useFamilyStore(useShallow(state => state.deleteMember));
