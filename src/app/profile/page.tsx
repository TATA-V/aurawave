import ProfileLayout from 'src/components/Layout/ProfileLayout';

import MyProfile from 'src/components/Profile/MyProfile';
import MyFriendAndMyPlaylist from 'src/components/Profile/MyFriendAndMyPlaylist';
import InactiveLandscape from 'src/components/Landscape/InactiveLandscape';
import LogoutAndDeleteAccount from 'src/components/Profile/LogoutAndDeleteAccount';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function ProfilePage() {
  return (
    <FadeInMotion>
      <ProfileLayout>
        <MyProfile />
        <MyFriendAndMyPlaylist />
        <InactiveLandscape />
        <LogoutAndDeleteAccount />
      </ProfileLayout>
    </FadeInMotion>
  );
}

export default ProfilePage;
