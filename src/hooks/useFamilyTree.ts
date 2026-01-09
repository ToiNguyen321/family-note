/**
 * Hook quản lý cây gia phả
 */

import { useFamilySelectors } from '@/store/familyStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFamilyTree,
  calculateLayout,
  findPersonById,
  getChildren,
  getParents,
  getSpouse,
} from '../services/familyTreeService';
import { EditProposal, Person } from '../types';

export const useFamilyTree = (initialMembers: Person[] = []) => {
  const {
    members,
    setMembers,
    addMember: addMemberAction,
    updateMember: updateMemberAction,
    deleteMember: deleteMemberAction,
  } = useFamilySelectors();
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [proposals, setProposals] = useState<EditProposal[]>([]);

  useEffect(() => {
    if (members.length === 0 && initialMembers.length > 0) {
      setMembers(initialMembers);
    }
  }, [members.length, initialMembers, setMembers]);

  // Xây dựng cây gia phả
  const tree = useMemo(() => {
    const rawTree = buildFamilyTree(members);
    if (!rawTree) return null;
    return calculateLayout(rawTree);
  }, [members]);

  // Lấy thành viên được chọn
  const selectedPerson = useMemo(() => {
    if (!selectedPersonId) return null;
    return findPersonById(members, selectedPersonId);
  }, [members, selectedPersonId]);

  // Lấy con cái của thành viên được chọn
  const selectedPersonChildren = useMemo(() => {
    if (!selectedPersonId) return [];
    return getChildren(members, selectedPersonId);
  }, [members, selectedPersonId]);

  // Lấy cha mẹ của thành viên được chọn
  const selectedPersonParents = useMemo(() => {
    if (!selectedPersonId) return [];
    return getParents(members, selectedPersonId);
  }, [members, selectedPersonId]);

  // Lấy vợ/chồng của thành viên được chọn
  const selectedPersonSpouse = useMemo(() => {
    if (!selectedPersonId) return null;
    return getSpouse(members, selectedPersonId);
  }, [members, selectedPersonId]);

  // Thêm thành viên mới
  const addMember = useCallback((person: Person) => {
    addMemberAction(person);
  }, []);

  // Cập nhật thành viên
  const updateMember = useCallback(
    (personId: string, updates: Partial<Person>) => {
      updateMemberAction(personId, updates);
    },
    [],
  );

  // Xóa thành viên
  const deleteMember = useCallback((personId: string) => {
    deleteMemberAction(personId);
  }, []);

  // Chọn thành viên
  const selectPerson = useCallback((personId: string | null) => {
    setSelectedPersonId(personId);
  }, []);

  // Gửi đề xuất chỉnh sửa
  const submitProposal = useCallback(
    (personId: string, proposedBy: string, changes: Partial<Person>) => {
      const proposal: EditProposal = {
        id: `proposal-${Date.now()}`,
        personId,
        proposedBy,
        changes,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setProposals(prev => [...prev, proposal]);
    },
    [],
  );

  // Duyệt đề xuất
  const approveProposal = useCallback(
    (proposalId: string, reviewedBy: string) => {
      const proposal = proposals.find(p => p.id === proposalId);
      if (!proposal) return;

      // Cập nhật thành viên
      updateMember(proposal.personId, proposal.changes);

      // Cập nhật trạng thái đề xuất
      setProposals(prev =>
        prev.map(p =>
          p.id === proposalId
            ? {
                ...p,
                status: 'approved',
                reviewedAt: new Date().toISOString(),
                reviewedBy,
              }
            : p,
        ),
      );
    },
    [proposals, updateMember],
  );

  // Từ chối đề xuất
  const rejectProposal = useCallback(
    (proposalId: string, reviewedBy: string) => {
      setProposals(prev =>
        prev.map(p =>
          p.id === proposalId
            ? {
                ...p,
                status: 'rejected',
                reviewedAt: new Date().toISOString(),
                reviewedBy,
              }
            : p,
        ),
      );
    },
    [],
  );

  return {
    members,
    tree,
    selectedPerson,
    selectedPersonId,
    selectedPersonChildren,
    selectedPersonParents,
    selectedPersonSpouse,
    proposals,
    addMember,
    updateMember,
    deleteMember,
    selectPerson,
    submitProposal,
    approveProposal,
    rejectProposal,
  };
};
