import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MoreIcon from '../assets/MoreIcon.svg'; // icône 3-points ou autre


export interface HistoricCardProps {
    title: string;
    by: string;
    time: string;
    image?: any;
    onPress?: () => void;
    AlertIcon?: any;

}


const HistoricCard: React.FC<HistoricCardProps> = ({
    title,
    by,
    time,
    image,
    onPress,
    AlertIcon,
}) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.leftIconWrapper}>
                {AlertIcon && <View><AlertIcon width={62} height={62} /></View>}
                {image && (
                    <Image
                        source={image}
                        style={styles.smallImage}
                        resizeMode="cover"
                    />
                )}
            </View>



            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.metaRow}>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>{t('by')}</Text>
                        <Text style={styles.metaText}>{by}</Text>
                    </View>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>{t('lastTime')}</Text>
                        <Text style={styles.metaText}>{time}</Text>
                    </View>
                </View>
            </View>

            {/* 3) Icône tout à droite */}
            <View style={styles.rightIconWrapper}>
                <View>
                    <MoreIcon width={16} height={16} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 10
    },
    /* leftIconWrapper: {
         width: 62,
         height: 62,
         borderRadius: 30,
         backgroundColor: '#F8F8F8',
       //  borderWidth: 1,
       //  borderColor: '#4B4B4B',
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
         marginRight: 12,
     },*/
    leftIconWrapper: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: '#EBF9F1', // vert clair pâle comme dans l'image
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // nécessaire pour positionner l'image par-dessus
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontFamily: 'Raleway',
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'flex-start', // pour que "by" et "at" soient en haut alignés
        gap: 24, // ou marginRight si pas supporté
    },

    metaBlock: {
        flexDirection: 'column',
    },

    metaLabel: {
        fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: '400',
        color: '#999', // un peu plus clair
        marginBottom: 2,
    },

    metaText: {
        fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    metaSpacer: {
        marginLeft: 16,
    },
    rightIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        flexShrink: 0,
    },
    smallImage: {
        width: 28,
        height: 28,
        borderRadius: 14,
        position: 'absolute',
        bottom: -4,
        right: -4,
        borderWidth: 2,
        borderColor: '#fff', // pour un effet "propre"
    },


});

export default HistoricCard;
