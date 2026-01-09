/**
 * Component hiển thị một node thành viên trong cây gia phả
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Person, PersonStatus } from '../../../types';

interface PersonNodeProps {
  person: Person;
  x: number;
  y: number;
  width: number;
  height: number;
  onPress?: (person: Person) => void;
  scale?: number;
  relationLabel?: string;
}

export const PersonNode: React.FC<PersonNodeProps> = ({
  person,
  x,
  y,
  width,
  height,
  onPress,
  scale = 1,
  relationLabel,
}) => {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const posX = x * scale;
  const posY = y * scale;

  const renderYears = () => {
    const birthYear = person.dateOfBirth
      ? new Date(person.dateOfBirth).getFullYear()
      : '...';
    const deathYear = person.dateOfDeath
      ? new Date(person.dateOfDeath).getFullYear()
      : person.status === PersonStatus.DECEASED
      ? '...'
      : 'nay';
    return `${birthYear} - ${deathYear}`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          left: posX,
          top: posY,
          width: scaledWidth,
          height: scaledHeight,
        },
      ]}
      onPress={() => onPress?.(person)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        {person.avatar ? (
          <Image source={{ uri: person.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {person.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        {person.status === PersonStatus.DECEASED && (
          <View style={styles.deceasedBadge} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {person.fullName}
      </Text>
      {person.role && (
        <Text style={styles.role} numberOfLines={1}>
          {person.role}
        </Text>
      )}
      {relationLabel && (
        <Text style={styles.relation} numberOfLines={1}>
          {relationLabel}
        </Text>
      )}
      <Text style={styles.year}>{renderYears()}</Text>
      {person.hometown && (
        <Text style={styles.meta} numberOfLines={1}>
          {person.hometown}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deceasedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#666',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  name: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginTop: 2,
  },
  role: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
    marginTop: 1,
  },
  year: {
    fontSize: 9,
    color: '#444',
    marginTop: 1,
  },
  meta: {
    fontSize: 8,
    color: '#777',
    marginTop: 1,
  },
  relation: {
    fontSize: 8,
    color: '#9b59b6',
    marginTop: 1,
  },
});
