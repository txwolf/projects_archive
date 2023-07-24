import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'

const PLACEHOLDER_IMG =
  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(220, 'Caption reached character limit'),
})

const FormikPostUploader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        console.log(values)
        console.log('Post submitted sucessfully')
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            ></Image>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                placeholder="Write a caption"
                multiline={true}
                style={{ fontSize: 20 }}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2}></Divider>
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ fontSize: 18 }}
            placeholder="Enter Image Url"
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: 'red' }}>
              {errors.imageUrl}
            </Text>
          )}

          <Button
            onPress={handleSubmit}
            title="Share"
            disabled={!isValid}
          ></Button>
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader
