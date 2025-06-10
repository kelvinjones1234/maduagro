export const groupMessagesByDate = (messages) => {
  if (!messages || messages.length === 0) return [];

  const grouped = [];
  let currentDate = null;

  messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp).toDateString();

    if (msgDate !== currentDate) {
      currentDate = msgDate;
      grouped.push({
        type: "date",
        date: new Date(msg.timestamp),
        id: `date-${msgDate}`,
      });
    }

    grouped.push(msg);

    // Add replies if they exist
    if (msg.replies && msg.replies.length > 0) {
      msg.replies.forEach((reply) => {
        grouped.push(reply);
      });
    }
  });

  return grouped;
};
