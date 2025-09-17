import React, { useState, useRef, useCallback, memo } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Heart, MessageCircle, Share, Play } from 'lucide-react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Test with simpler, more reliable video URLs
const videoData = [
  { 
    id: '1', 
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    user: '@farmer_ajay', 
    description: 'Testing video playback #farming #test' 
  },
  { 
    id: '2', 
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 
    user: '@sunita_kheti', 
    description: 'Another test video for our shorts player.' 
  },
  { 
    id: '3', 
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
    user: '@village_life', 
    description: 'Third test video to check scrolling behavior.' 
  },
];

// Add error handling and debug logging
const VideoItem = memo(({ item, isFocused }: { item: typeof videoData[0], isFocused: boolean }) => {
  const videoRef = useRef<Video>(null);
  const [isPaused, setIsPaused] = useState(!isFocused);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    console.log(`Video ${item.id} focus changed:`, isFocused);
    if (videoRef.current) {
      if (isFocused) {
        videoRef.current.playAsync().catch(error => {
          console.error('Error playing video:', error);
          setHasError(true);
        });
        setIsPaused(false);
      } else {
        videoRef.current.pauseAsync().catch(console.error);
        videoRef.current.setPositionAsync(0).catch(console.error);
        setIsPaused(true);
      }
    }
  }, [isFocused]);

  const togglePlayback = () => {
    if (videoRef.current && !hasError) {
      if (isPaused) {
        videoRef.current.playAsync().catch(console.error);
      } else {
        videoRef.current.pauseAsync().catch(console.error);
      }
      setIsPaused(!isPaused);
    }
  };

  const onLoadStart = () => {
    console.log(`Video ${item.id} started loading`);
    setIsLoading(true);
    setHasError(false);
  };

  const onLoad = () => {
    console.log(`Video ${item.id} loaded successfully`);
    setIsLoading(false);
  };

  const onError = (error: any) => {
    console.error(`Video ${item.id} error:`, error);
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isFocused && !hasError}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onError={onError}
        useNativeControls={false}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading video...</Text>
        </View>
      )}

      {/* Error fallback */}
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load video</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => {
              setHasError(false);
              setIsLoading(true);
            }}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Playback controls */}
      {!hasError && (
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          onPress={togglePlayback} 
          activeOpacity={1}
        >
          {isPaused && !isLoading && (
            <View style={styles.overlay}>
              <Play size={80} color="rgba(255, 255, 255, 0.7)" fill="rgba(255, 255, 255, 0.5)" />
            </View>
          )}
        </TouchableOpacity>
      )}

      {/* UI Overlay */}
      <View style={styles.uiOverlay}>
        <View style={styles.textContainer}>
          <Text style={styles.userText}>{item.user}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={32} color="white" />
            <Text style={styles.actionText}>1.2k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={32} color="white" />
            <Text style={styles.actionText}>345</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={32} color="white" />
            <Text style={styles.actionText}>123</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const Shorts: React.FC = () => {
  const [visibleVideoId, setVisibleVideoId] = useState<string | null>(
    videoData.length > 0 ? videoData[0].id : null
  );

  console.log('Shorts component rendered, visible video:', visibleVideoId);
  console.log('Video data length:', videoData.length);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    console.log('Viewable items changed:', viewableItems.length);
    if (viewableItems.length > 0) {
      const newVisibleId = viewableItems[0].item.id;
      console.log('Setting visible video to:', newVisibleId);
      setVisibleVideoId(newVisibleId);
    }
  }, []);

  const renderItem = ({ item, index }: { item: typeof videoData[0], index: number }) => {
    console.log(`Rendering item ${index}:`, item.id);
    return <VideoItem item={item} isFocused={visibleVideoId === item.id} />;
  };

  // Add a test fallback
  if (videoData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No videos available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={SCREEN_HEIGHT}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'black',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
  },
  uiOverlay: {
    position: 'absolute',
    bottom: 100, // Increased from 80 to avoid tab bar
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  userText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  descriptionText: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  actionsContainer: {
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Shorts;