import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../theme/colors';
import { metrics } from '../theme/metrics';
import { SimpleButton } from './simple-button';

interface StandardModal {
    type: 'standard';
    text:string;
}

interface CustomModal {type:'custom'; element :ReactElement}

type ModalContentType = StandardModal | CustomModal;

interface Props{
    show : boolean;
    content : ModalContentType;
    title:string;
    dismissButton?: {title?:string; onDismiss?:()=> void};
}


export function Modal(props:Props): ReactElement<Props> | null{
    if (!props.show){
        return null;
    }

    return (
        <View style={styles.fullScreenContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{props.title}</Text>
            {/**
             * If the content is standard, just render the text in the <Text> element
             */}
            {props.content.type === 'standard' && (
              <View style={styles.standardContentContainer}>
                <Text style={styles.message}>{props.content.text}</Text>
              </View>
            )}
            {/**
             * If the content is custom, render the element as is
             */}
            {props.content.type === 'custom' && <View style={styles.customContentContainer}>{props.content.element}</View>}
            <SimpleButton
                    title={props.dismissButton?.title ?? 'OK'}
                    style={{ width: '50%', alignSelf: 'center' }}
                    onPress={props.dismissButton?.onDismiss} isDisabled={false}            />
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      fullScreenContainer: {
        // We place the element over the entire screen and center it
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: colors.blankedOutBackground,
      },
      title: {
        fontSize: metrics.h1FontSize,
        alignSelf: 'center',
        paddingBottom: metrics.baseMargin,
      },
      innerContainer: {
        backgroundColor: colors.buttonWhite,
        minHeight: '30%',
        marginHorizontal: metrics.doubleMargin,
        padding: metrics.baseMargin,
        borderRadius: metrics.borderRadius,
      },
      standardContentContainer: {
        flex: 1,
        alignItems: 'center',
      },
      customContentContainer: {
        alignItems: 'center',
      },
      message: {
        fontSize: metrics.bodyFontSize,
      },
    });