1. What is the difference between var, let, and const?
=> var (The Old Way): It’s very loose. You can declare it, redeclare it, and use it even before it’s defined (hoisting). It doesn't care about "blocks" (like if statements), only functions. It's generally avoided now because it leads to messy bugs.
let (The Modern Standard): Use this for variables that will change. It respects block scope (stays inside {}).
const (The Safe Way): Use this for things that won’t change. Once you set it, you can’t reassign it. It makes your code much more predictable.
2. What is the spread operator (...) ?
=> In Arrays: const newArray = [...oldArray, 4, 5]; (This copies the old items into the new one).
In Objects: const newObj = { ...oldObj, status: 'active' }; (This copies all properties and adds a new one).
copying data without accidentally changing the original.
3. What is the difference between map(), filter(), and forEach()?
=> forEach() (The Manual Laborer): It just goes through every item and does something (like printing it). It returns nothing. Use it when you just need to "do" something.
map() (The Transformer): It goes through the list and creates a brand new list where every item has been changed. Use it when you want to convert data (e.g., turning numbers into strings).
filter() (The Bouncer): It looks at the list and creates a new list containing only the items that pass a specific test.
4. What is an arrow function?
=> It’s basically a "shorthand" for writing functions. Instead of writing the word function every time, you use a "fat arrow" =>
Old: function(a) { return a + 1; }
New: (a) => a + 1;
5. What are template literals?
=> Instead of quotes, you use backticks (`). You can drop variables directly into the string using ${variable}.
Old: "User is " + name + " and age is " + age;
New: `User is ${name} and age is ${age}`
