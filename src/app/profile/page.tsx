import ProfileLayout from 'src/components/Layout/ProfileLayout';

import BottomTab from 'src/components/BottomTab/BottomTab';
import MyProfile from 'src/components/Profile/MyProfile';
import MyFriendAndMyPlaylist from 'src/components/Profile/MyFriendAndMyPlaylist';
import InactiveLandscape from 'src/components/Landscape/InactiveLandscape';
import LogoutAndDeleteAccount from 'src/components/Profile/LogoutAndDeleteAccount';

function ProfilePage() {
  return (
    <ProfileLayout>
      <MyProfile />
      <MyFriendAndMyPlaylist />
      <InactiveLandscape />
      <LogoutAndDeleteAccount />
      <BottomTab />
    </ProfileLayout>
  );
}

export default ProfilePage;
