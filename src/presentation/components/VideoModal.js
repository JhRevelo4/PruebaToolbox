import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/VideoModal.styles';

const VIDEO_UNAVAILABLE_MSG = 'Video no disponible';

function isValidVideoUri(uri) {
  if (uri == null || typeof uri !== 'string') return false;
  const trimmed = uri.trim();
  if (trimmed.length === 0) return false;
  return trimmed.startsWith('http://') || trimmed.startsWith('https://');
}

let VideoComponent = null;
try {
  VideoComponent = require('react-native-video').default;
} catch (e) {
  console.warn('react-native-video no está disponible:', e.message);
  VideoComponent = null;
}

const VideoModal = ({ visible, videoUrl, title = '', description = '', onClose }) => {
  const insets = useSafeAreaInsets();
  const hasVideo = isValidVideoUri(videoUrl);
  const hasDescription = Boolean(title || description);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.closeTouch} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {hasVideo ? (
            <VideoPlayer uri={videoUrl.trim()} />
          ) : (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>{VIDEO_UNAVAILABLE_MSG}</Text>
            </View>
          )}
        </View>
        {hasDescription && (
          <View style={styles.descriptionContainer}>
            {title ? <Text style={styles.descriptionTitle}>{title}</Text> : null}
            {description ? (
              <ScrollView
                style={styles.descriptionScroll}
                contentContainerStyle={styles.descriptionScrollContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.descriptionText}>{description}</Text>
              </ScrollView>
            ) : null}
          </View>
        )}
      </View>
    </Modal>
  );
};

function VideoPlayer({ uri }) {
  const [error, setError] = useState(false);

  if (!VideoComponent || error || !isValidVideoUri(uri)) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{VIDEO_UNAVAILABLE_MSG}</Text>
      </View>
    );
  }

  return (
    <VideoComponent
      source={{ uri: uri }}
      style={styles.video}
      resizeMode="contain"
      onError={() => setError(true)}
      controls
      ignoreSilentSwitch="ignore"
    />
  );
}

export default VideoModal;
export { VIDEO_UNAVAILABLE_MSG };
