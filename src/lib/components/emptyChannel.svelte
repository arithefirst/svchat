<script>
  import { blur } from 'svelte/transition';

  const messages = [
    'A wild empty channel appears! What will you do?',
    'Be the hero this chat deserves. Or just type "hi".',
    'Echo... Echo... Is anyone there?',
    'Empty chat, press "F" to pay respects.',
    'Get the party started by sending a message!',
    "Go ahead, say something! I won't bite… much.",
    'Hello? Is this thing on?',
    'If a message is sent in an empty chat, does it make a sound?',
    'Imagine crickets chirping… now stop them by sending a message!',
    "Just type something, this isn't rocket science.",
    'Silence is golden, but chatting is more fun!',
    'Talk to me, Goose.',
    'Your keyboard looks bored. Give it something to do.',
    'Your words will be the first ever spoken here. No pressure.',
  ];
</script>

<div class="abs-center text-center text-muted-foreground" out:blur>
  <h1 class="text-4xl" in:blur={{ delay: 100 }}>No messages yet!</h1>
  <h2 class="mt-2 text-sm" in:blur={{ delay: 300 }}>{messages[Math.floor(Math.random() * messages.length)]}</h2>
</div>
