import { ScrollView, StyleSheet } from 'react-native';
import { MainMenuExternalLinks, MainMenuLinks } from '@constants/navigations';
import { useAuth } from '@hooks';
import { IonicIcon, MaterialCommunityIcon } from '@components/icons';
import { ExternalLink, InternalLink, TranslationText } from '@components/atoms';

const Links = () => {
  const { user } = useAuth();
  const allowPrivate = !!user;

  return (
    <ScrollView style={styles.root}>
      {MainMenuLinks.map(({
        to,
        icon,
        label,
        isPrivate,
      }) => {
        if (!isPrivate || allowPrivate) {
          return (
            <InternalLink to={to} key={label} style={styles.item}>
              <IonicIcon name={icon} size={25} />
              <TranslationText name={label} style={styles.link} />
            </InternalLink>
          );
        }

        return;
      })}

      {MainMenuExternalLinks.map(({
        url,
        icon,
        label,
      }) => (
        <ExternalLink key={label} url={url} style={styles.item}>
          <MaterialCommunityIcon name={icon} size={25} />
          <TranslationText name={label} style={styles.link} />
        </ExternalLink>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  item: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default Links;
