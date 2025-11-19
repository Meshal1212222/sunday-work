// Configuration
const API_URL = 'https://api.ultramsg.com/instance117440';
const TOKEN = '21jybm4xten03x21';
const INVITE_LINK = 'https://chat.whatsapp.com/Ll7q9yg9AsbEmohPnJ5IgO';

const MESSAGE = `السلام عليكم يا جماعة الخير! 🎉

جايكم نظام إدارة قوي من Sunday Board Pro! 🚀
صبركم بس شوي وراح نبهركم! 💪✨`;

async function testSendToGroup() {
  try {
    console.log('🚀 Starting test...\n');

    // Step 1: Extract invite code
    const inviteCode = INVITE_LINK.split('chat.whatsapp.com/')[1];
    console.log('📌 Invite Code:', inviteCode);

    // Step 2: Try to join the group
    console.log('\n📱 Step 1: Attempting to join group...');
    const joinUrl = `${API_URL}/group/join`;
    const joinResponse = await fetch(joinUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        token: TOKEN,
        inviteCode: inviteCode
      })
    });

    const joinData = await joinResponse.json();
    console.log('Join Response:', JSON.stringify(joinData, null, 2));

    // Step 3: Get all groups
    console.log('\n📋 Step 2: Fetching groups list...');
    const groupsUrl = `${API_URL}/chats/groups?token=${TOKEN}`;
    const groupsResponse = await fetch(groupsUrl);
    const groupsData = await groupsResponse.json();

    console.log(`Found ${Array.isArray(groupsData) ? groupsData.length : 0} groups:`);
    if (Array.isArray(groupsData)) {
      groupsData.forEach((group, index) => {
        console.log(`  ${index + 1}. ${group.name || group.subject} (ID: ${group.id})`);
      });
    }

    if (!Array.isArray(groupsData) || groupsData.length === 0) {
      console.log('\n❌ ERROR: No groups found!');
      console.log('💡 This means the WhatsApp account is not a member of any groups.');
      console.log('💡 Please make sure:');
      console.log('   1. The WhatsApp account connected to Ultra MSG is a member of the group');
      console.log('   2. Try joining the group manually first from WhatsApp');
      return;
    }

    // Step 4: Try to send to the first group (newest)
    const targetGroup = groupsData[0];
    console.log(`\n✉️ Step 3: Sending message to: ${targetGroup.name || targetGroup.subject}`);
    console.log(`Target Group ID: ${targetGroup.id}`);

    const sendUrl = `${API_URL}/messages/chat`;
    const sendResponse = await fetch(sendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        token: TOKEN,
        to: targetGroup.id,
        body: MESSAGE,
        priority: '10'
      })
    });

    const sendData = await sendResponse.json();
    console.log('\nSend Response:', JSON.stringify(sendData, null, 2));

    if (sendData.sent === 'true' || sendData.sent === true) {
      console.log('\n✅ SUCCESS! Message sent to group!');
    } else {
      console.log('\n❌ FAILED to send message!');
      console.log('Error:', sendData.error || sendData.message || 'Unknown error');
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error);
  }
}

// Run the test
testSendToGroup();
