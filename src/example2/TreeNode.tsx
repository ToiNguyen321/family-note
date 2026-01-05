import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NODE_HEIGHT, NODE_WIDTH } from './layout';

export function TreeNode({ x, y, name, avatar, birthYear }: any) {
  return (
    <View style={[styles.container, { left: x, top: y }]}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      {birthYear && <Text style={styles.year}>🎂 {birthYear}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginBottom: 6,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  year: {
    fontSize: 12,
    color: '#777',
  },
});
