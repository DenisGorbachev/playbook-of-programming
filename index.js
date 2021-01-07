/**
 * Effects:
 * - Execute with a single argument (userUid) -> Output the tasks for the user
 */

const getTask = async function(userUid) {
  const tasks = [
    'Implement price model idea'
  ]
  return 'Validate price model idea'
}

getTask(process.argv[0])
  .then(console.log)
  .catch(console.error)
