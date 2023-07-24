import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical"></Divider>
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image source={post.profile_picture} style={styles.story} />
      <Text style={{ marginLeft: 10 }}>{post.user}</Text>
    </View>

    <Text style={{ marginTop: -10, fontWeight: '900' }}>...</Text>
  </View>
)

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 400 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    ></Image>
  </View>
)

const PostFooter = ({ post }) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flexDirection: 'row' }}>
      <Icon
        iconStyle={[styles.footerIcon, styles.footerIconHeart]}
        iconSource={require('../../assets/images/heart.jpg')}
      ></Icon>
      <Icon
        iconStyle={styles.footerIcon}
        iconSource={require('../../assets/images/comment.png')}
      ></Icon>
      <Icon
        iconStyle={styles.footerIcon}
        iconSource={require('../../assets/images/direct.png')}
      ></Icon>
    </View>
    <View style={{ alignItems: 'flex-end', flex: 1 }}>
      <Icon
        iconStyle={[styles.footerIcon, styles.footerIconLast]}
        iconSource={require('../../assets/images/collection.png')}
      ></Icon>
    </View>
  </View>
)

const Icon = ({ iconStyle, iconSource }) => (
  <TouchableOpacity>
    <Image style={iconStyle} source={iconSource}></Image>
  </TouchableOpacity>
)

const Likes = ({ post }) => (
  <View style={{ marginTop: 6 }}>
    <Text style={{ fontWeight: '600' }}>
      {post.likes.toLocaleString('en')} likes
    </Text>
  </View>
)

const Caption = ({ post }) => (
  <View style={{ marginTop: 6 }}>
    <Text>
      <Text style={{ fontWeight: '600' }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
)

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 6 }}>
    <Text style={{ color: 'gray' }}>
      View {post.comments.length > 1 ? 'comments' : 'comment'}
    </Text>
  </View>
)

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ marginTop: 6 }}>
        <Text>
          <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
)

const styles = StyleSheet.create({
  story: {
    width: 32,
    height: 32,
    borderColor: '#ff8501',
    borderWidth: 2,
    borderRadius: 50,
  },
  footerIcon: {
    width: 29,
    height: 29,
    marginRight: 15,
    resizeMode: 'contain',
  },
  footerIconHeart: {
    resizeMode: 'contain',
  },
  footerIconLast: {
    marginRight: 0,
  },
})

export default Post
