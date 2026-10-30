// Part 1: Interview questions
export const part1IntroQuestion = "What's your name and where do you come from?"

export const part1TopicQuestions = [
  "How do you come to school every day?",
  "Tell me about your family.",
  "What do you usually do after school?",
  "Tell me about your weekend routine.",
  "What do you enjoy doing in your leisure time?",
  "Do you have a hobby? Tell me about it.",
  "What is your morning routine like?",
  "Tell me about your favourite holiday.",
  "What do you like about your school?",
  "Who is your best friend? Tell me about them.",
  "What did you do last weekend?",
  "What is your favourite subject in school? Why?",
]

// Part 2: Individual Long Turn
// followUp = the quick question the OTHER candidate answers after the long turn (related but different angle)
export const part2Sets = [
  {
    state: "Perlis Set 1",
    a: { topic: "Favourite team sport", prompts: ["What team sport you like", "Why it is your favourite", "Whether you prefer to watch or play the sport", "If you would choose sport as a career (why/why not)"], followUp: "Do you think team sports or individual sports build better character? Why?" },
    b: { topic: "A dream job", prompts: ["What your dream job is", "Why you want this job", "What you will do to achieve it", "If teenagers should be selective in choosing a job (why/why not)"], followUp: "Would you rather have a high-paying job you dislike or a low-paying job you love? Why?" },
  },
  {
    state: "Perlis Set 2",
    a: { topic: "Favourite subject in school", prompts: ["What the subject is", "Why you enjoy learning it", "How important the subject is", "How you can master the subject"], followUp: "Which subject do you find the most challenging? Why?" },
    b: { topic: "A language you would like to learn", prompts: ["What the language is", "Where it is spoken", "Why you are interested to learn it", "The importance of learning a new/foreign language"], followUp: "Do you think learning languages is easier when you are young? Why?" },
  },
  {
    state: "Perlis Set 3",
    a: { topic: "Good food you enjoy", prompts: ["What food makes you happy", "Why you enjoy the food", "What special dish you wish to try and why", "What benefits students gain by eating good food"], followUp: "Do you prefer eating at home or eating out? Why?" },
    b: { topic: "Good habit you practise", prompts: ["What the good habit is", "How you feel doing it", "Why you practise it", "Why it is important for students to have good habits"], followUp: "What bad habit would you like to break? Why?" },
  },
  {
    state: "Perlis Set 4",
    a: { topic: "Favourite shop", prompts: ["Where the shop is", "What things it sells", "How often you go there", "Why you like shopping there"], followUp: "Do you think online shopping will replace physical shops? Why?" },
    b: { topic: "Expensive item you own", prompts: ["What the product is", "Where you bought it", "What makes the item special", "Why you like the item"], followUp: "Do you think expensive things are always better quality? Why?" },
  },
  {
    state: "Perlis Set 5",
    a: { topic: "Favourite application", prompts: ["What it is", "How you would describe it", "How often you use it", "Why it is so important to you"], followUp: "Do you think teenagers spend too much time on their phones? Why?" },
    b: { topic: "Best gadget", prompts: ["What gadget you use on a daily basis", "What you use it for", "How much time you spend on it", "How it makes your life better"], followUp: "If you could only keep one gadget, which would it be? Why?" },
  },
  {
    state: "Kelantan Set 1",
    a: { topic: "A crime you heard recently", prompts: ["What the crime was", "When it happened", "Who were involved", "Ways to prevent crimes"], followUp: "Do you feel safe in your neighbourhood? Why or why not?" },
    b: { topic: "A disciplinary problem in your school", prompts: ["What the problem was", "Who were involved", "The actions taken to solve the problem", "If it is important to have stricter rules in schools (why/why not)"], followUp: "What would you do if you saw a student breaking school rules?" },
  },
  {
    state: "Kelantan Set 2",
    a: { topic: "An environmental problem in your area", prompts: ["What the problem is", "The cause of the problem", "How it affects your daily life", "How to promote environmental awareness among students"], followUp: "What is one thing you personally do to help the environment?" },
    b: { topic: "A community project you joined", prompts: ["What you did", "Who were involved in the activity", "What you learnt from the activity", "If it is important to carry out community projects (why/why not)"], followUp: "Would you volunteer again for a community project? Why?" },
  },
  {
    state: "Kelantan Set 3",
    a: { topic: "An indoor game", prompts: ["What the game is", "When you usually play the game", "Why you enjoy playing the game", "The benefits of playing indoor games"], followUp: "Do you prefer playing games alone or with others? Why?" },
    b: { topic: "An outdoor game", prompts: ["What the game is", "When you usually play the game", "Why you enjoy playing the game", "The benefits of playing outdoor games"], followUp: "Do you think children today play outdoors enough? Why?" },
  },
  {
    state: "Kelantan Set 4",
    a: { topic: "An item you bought online", prompts: ["What the item was", "Which platform you used to buy it", "Why you prefer to buy it online", "The cons of online shopping"], followUp: "Have you ever been disappointed by an online purchase? What happened?" },
    b: { topic: "A gadget that you like", prompts: ["What it is", "Where you got it from", "Why it is important to you", "The negative effects of spending too much time on gadgets"], followUp: "How would your life change if you had no gadgets for a week?" },
  },
  {
    state: "Kelantan Set 5",
    a: { topic: "A memorable holiday", prompts: ["Where you went to", "How you travelled there", "What made the holiday memorable", "The benefits of going on a holiday in your country"], followUp: "Do you prefer holidays with family or friends? Why?" },
    b: { topic: "Sports you would like to try", prompts: ["What sport it is", "What equipment is needed", "Why you want to try it", "How to encourage teenagers to take up sports"], followUp: "What stops most teenagers from being active? Why?" },
  },
  {
    state: "Kelantan Set 6",
    a: { topic: "Your best friend", prompts: ["Who your best friend is", "How you met each other", "Why he/she is your best friend", "If it is important to have a best friend (why/why not)"], followUp: "What do you do when you have an argument with a friend?" },
    b: { topic: "My favourite local food", prompts: ["What the food is", "Where you usually get the food from", "Why you like the food", "If you prefer local or fast food (why/why not)"], followUp: "What food would you recommend a tourist tries in Malaysia? Why?" },
  },
  {
    state: "Terengganu Set 1",
    a: { topic: "A respectable person", prompts: ["Who the person is", "What the person's profession is", "Why you respect the person", "If it is important to have role models (why/why not)"], followUp: "What qualities do you look for in a role model?" },
    b: { topic: "Being helpful", prompts: ["Who the person was", "How you helped the person", "If you felt good about it (why/why not)", "Why being helpful is important"], followUp: "Do you think people are less helpful nowadays? Why?" },
  },
  {
    state: "Terengganu Set 2",
    a: { topic: "A favourite book", prompts: ["What the title is", "When you first read it", "Why you like the book", "If reading books is good for teenagers (why/why not)"], followUp: "Do you prefer reading physical books or e-books? Why?" },
    b: { topic: "A co-curricular activity", prompts: ["What activity you are involved in", "When you do this activity", "What you like about this activity", "If co-curricular activity is important for students (why/why not)"], followUp: "Should co-curricular activities be compulsory? Why?" },
  },
  {
    state: "Terengganu Set 3",
    a: { topic: "My best friend", prompts: ["Who your friend is", "How your friend looks like", "How you feel when spending time with your friend", "If having a best friend is important (why/why not)"], followUp: "Can online friends be as close as real-life friends? Why?" },
    b: { topic: "My favourite place", prompts: ["Where the place is", "When you normally go there", "What you enjoy about that place", "If it is important to relax after studying (why/why not)"], followUp: "Where do you go when you feel stressed? Why?" },
  },
  {
    state: "N. Sembilan Set 1",
    a: { topic: "A sport you know", prompts: ["The name of the sport", "How you found out about it", "Who you play/watch it with", "If you would play it professionally (why/why not)"], followUp: "Should schools give more time for sports? Why?" },
    b: { topic: "Learning a new skill", prompts: ["A new skill you would like to learn", "When did you learn about it", "Where you can learn this skill", "Reason(s) you want to learn that skill"], followUp: "What is the hardest skill you've ever tried to learn?" },
  },
  {
    state: "N. Sembilan Set 2",
    a: { topic: "Recent gathering", prompts: ["When it was held", "The purpose of it", "If it involved family or friends", "If you liked it (why/why not)"], followUp: "Do you prefer big gatherings or small ones? Why?" },
    b: { topic: "Recent item bought", prompts: ["What it was", "How much it cost", "Why did you buy it", "Would you recommend it to others (why/why not)"], followUp: "What was the last thing you bought? Was it worth it?" },
  },
  {
    state: "N. Sembilan Set 3",
    a: { topic: "A favourite country you would like to visit", prompts: ["The name of the country", "Why it is your favourite country", "What you would do there", "Whether you would recommend it to family and friends (why/why not)"], followUp: "Do you think travelling makes a person more mature? Why?" },
    b: { topic: "A weather you would like to experience", prompts: ["What it is", "What makes this weather special", "How do you plan to experience it", "If you want to experience it alone or with others (why/why not)"], followUp: "How does the weather affect your mood?" },
  },
  {
    state: "N. Sembilan Set 4",
    a: { topic: "Favourite video on YouTube", prompts: ["What your favourite video is", "Why it is your favourite", "How can the video be improved", "Whether you would make a YouTube video (why/why not)"], followUp: "Do you think YouTube is educational or just entertainment? Why?" },
    b: { topic: "Gadget you wish for", prompts: ["What it is", "How much it costs", "Reasons you would like to have it", "If you would buy it for others (why/why not)"], followUp: "Do you save up for things you want or ask your parents? Why?" },
  },
  {
    state: "SBP Set 1",
    a: { topic: "Your favourite gadget", prompts: ["What the gadget is", "Where you got it", "Why it is your favourite", "How it helps in your daily life"], followUp: "How would you feel if you lost your favourite gadget?" },
    b: { topic: "An athlete you admire", prompts: ["Who the athlete is", "What sport they play", "Why you admire them", "If sports can be a good career (why/why not)"], followUp: "Do you think athletes are good role models? Why?" },
  },
  {
    state: "SBP Set 2",
    a: { topic: "Favourite online shopping application", prompts: ["What it is", "Why you like it", "How often you use it", "If online shopping is better than physical shopping (why/why not)"], followUp: "Have you ever bought something you regretted? What was it?" },
    b: { topic: "Favourite invention", prompts: ["What the invention is", "Who invented it", "Why it is important", "How it has changed people's lives"], followUp: "If you could invent something, what would it be? Why?" },
  },
  {
    state: "SBP Set 3",
    a: { topic: "A place you would like to visit", prompts: ["Where the place is", "Why you want to visit it", "What you would do there", "If travelling is important for young people (why/why not)"], followUp: "Would you prefer to travel alone or with a group? Why?" },
    b: { topic: "Your favourite person", prompts: ["Who the person is", "What they do", "Why they are your favourite", "What you have learnt from them"], followUp: "What is the best advice someone has given you?" },
  },
  {
    state: "Pahang Set 1",
    a: { topic: "A scary experience", prompts: ["What happened", "When and where it happened", "How you felt", "What you learnt from the experience"], followUp: "Are you someone who gets scared easily? Why?" },
    b: { topic: "Experience going camping", prompts: ["Where you went camping", "Who you went with", "What you did there", "If you would go camping again (why/why not)"], followUp: "Do you prefer indoor or outdoor activities during holidays? Why?" },
  },
  {
    state: "Pahang Set 2",
    a: { topic: "Managing money", prompts: ["How you manage your money", "Why it is important to save", "What you spend your money on", "Tips for teenagers to manage money wisely"], followUp: "If you received RM500 right now, what would you do with it?" },
    b: { topic: "Canteen day at school", prompts: ["What you did during canteen day", "What food was sold", "If you enjoyed it (why/why not)", "If schools should organise canteen days (why/why not)"], followUp: "What school event do you enjoy the most? Why?" },
  },
  {
    state: "Pahang Set 3",
    a: { topic: "An environmental problem", prompts: ["What the problem is", "What causes it", "How it affects people", "How to solve the problem"], followUp: "Do you think young people care enough about the environment? Why?" },
    b: { topic: "Your experience getting injured", prompts: ["What happened", "How you got injured", "How you recovered", "What you learnt from the experience"], followUp: "Are you generally a careful or adventurous person? Why?" },
  },
  {
    state: "Pahang Set 4",
    a: { topic: "A wish you want to fulfil", prompts: ["What your wish is", "Why you have this wish", "How you plan to achieve it", "If it is important to have wishes/goals (why/why not)"], followUp: "Do you believe setting goals helps you succeed? Why?" },
    b: { topic: "A place you would like to visit", prompts: ["Where the place is", "Why you want to visit", "What you would do there", "If travelling broadens your mind (why/why not)"], followUp: "Have you ever been somewhere that changed your perspective? Where?" },
  },
  {
    state: "Pahang Set 5",
    a: { topic: "An expensive item you have bought", prompts: ["What the item is", "Where you bought it", "How you benefit from the item", "Whether spending money on expensive items is a good choice (why/why not)"], followUp: "Do you think teenagers should earn their own money to buy things? Why?" },
    b: { topic: "Spending money", prompts: ["How much you spend in a week", "Where do you spend your money", "What items you like to buy", "Whether comparing prices before buying is good (why/why not)"], followUp: "What was the last thing you bought? Was it worth it?" },
  },
  {
    state: "Pahang Set 6",
    a: { topic: "A healthy eating habit", prompts: ["What the food is", "Where you buy the ingredients", "How you prepare it", "Whether it is important to practise a healthy lifestyle (why/why not)"], followUp: "Do you find it hard to eat healthily as a student? Why?" },
    b: { topic: "An extreme activity you would like to try", prompts: ["What the activity is", "When is the best time to do it", "Reasons for choosing this activity", "Whether it is important to keep yourself busy with activities (why/why not)"], followUp: "What would your parents say if you wanted to try an extreme sport?" },
  },
  {
    state: "Johor BP Set 1",
    a: { topic: "Shopping experience", prompts: ["Where you normally shop", "Who do you shop with", "If you enjoy it (why/why not)", "Why shopping is a popular activity"], followUp: "Do you think people buy things they don't need? Why?" },
    b: { topic: "Online games experience", prompts: ["What device you play on", "What type of game you play", "What is your favourite online game", "The positive/negative impacts of online games"], followUp: "Do you think gaming can be a career? Why?" },
  },
  {
    state: "Johor BP Set 2",
    a: { topic: "Students' involvement in part-time jobs", prompts: ["What kind of job students take", "The reasons students take part-time jobs", "How students can balance study and work", "The drawbacks/benefits of part-time jobs for students"], followUp: "Would you take a part-time job during school? Why?" },
    b: { topic: "E-cigarettes and vaping among teenagers", prompts: ["The dangers of e-cigarettes and vaping", "How it can affect teenagers", "Why teenagers smoke e-cigarettes or vape", "The effects of increasing the price of e-cigarettes"], followUp: "How would you advise a friend who vapes to stop?" },
  },
  {
    state: "Johor BP Set 3",
    a: { topic: "Showing appreciation", prompts: ["Who do you appreciate", "How did you show your appreciation", "Why did you appreciate the person", "How showing appreciation gives a positive impact in a relationship"], followUp: "When was the last time someone showed appreciation to you? How did it feel?" },
    b: { topic: "An environmental problem in your area", prompts: ["What the environmental problem is", "The effects of this problem", "How you can help overcome this problem", "What the community can do to solve this problem"], followUp: "What would you do if you saw someone littering?" },
  },
  {
    state: "Johor BP Set 4",
    a: { topic: "Favourite cartoon series", prompts: ["What it was and is it still aired", "How much time you spent watching it", "Why it was your favourite", "If you would recommend children watching it"], followUp: "Do you think cartoons are just for children? Why?" },
    b: { topic: "Extreme sports experience", prompts: ["What it was", "Where you did it", "What precautions you took", "What you enjoyed the most"], followUp: "Would you try bungee jumping or skydiving? Why?" },
  },
  {
    state: "Johor TK Set 1",
    a: { topic: "A healthy activity", prompts: ["What the activity is", "Where you do the activity", "Who you do it with", "Why you think doing the activity is healthy"], followUp: "What motivates you to stay active?" },
    b: { topic: "Favourite shop", prompts: ["Where the shop is", "What it sells", "Why is it your favourite shop", "If you recommend the shop to friends (why/why not)"], followUp: "Do you prefer shopping alone or with friends? Why?" },
  },
  {
    state: "Johor TK Set 2",
    a: { topic: "Your shopping habit", prompts: ["What is your habit", "Why do you do it", "Whether traditional or online shopping is better (why)", "Whether you should continue doing it and why"], followUp: "What was the last thing you bought? Was it planned?" },
    b: { topic: "Beauty standard across cultures", prompts: ["What is your personal view on beauty standards", "How important it is to be beautiful", "Why do people want to look good", "If teenagers are spending too much time/money to look good (why/why not)"], followUp: "Do you think social media affects how people see beauty? Why?" },
  },
  {
    state: "Johor TK Set 3",
    a: { topic: "Drama series you have watched", prompts: ["Which drama series is it", "What was it about", "Why do you like the drama series", "Would you recommend it to someone (why/why not)"], followUp: "Do you binge-watch shows or watch one episode at a time? Why?" },
    b: { topic: "My electronic gadget", prompts: ["What your favourite gadget is", "Who gave you the gadget", "What the gadget is used for", "Why having an electronic gadget is important for teenagers"], followUp: "At what age should children get their first phone? Why?" },
  },
  {
    state: "Johor TK Set 4",
    a: { topic: "A popular local dish", prompts: ["The name of the dish", "Why is it popular", "Why you like or dislike it", "Whether you would recommend this dish to foreign tourists (why/why not)"], followUp: "Can you cook any local dishes? Which one?" },
    b: { topic: "A local product", prompts: ["The name of the product", "Where can you get it", "The speciality of the product", "If it is important for Malaysians to support local products (why/why not)"], followUp: "Do you usually check if products are locally made before buying? Why?" },
  },
  {
    state: "Kedah Set 1",
    a: { topic: "Relaxing activity", prompts: ["What you do to relax", "Where you go to relax", "If it is more relaxing to be alone or with friends (why)", "Whether it is important for students to relax (why/why not)"], followUp: "How do you know when you need to take a break?" },
    b: { topic: "Shopping at night market", prompts: ["Where is the popular night market in your town", "When was the last time you went", "Do you like hanging out at a night market (why)", "Whether teenagers should take up a part-time job there (why/why not)"], followUp: "Would you prefer a night market or a shopping mall? Why?" },
  },
  {
    state: "Kedah Set 2",
    a: { topic: "Healthy diet", prompts: ["What your regular diet is", "How you maintain a balanced diet", "Why you need to maintain a balanced diet", "If it is important to include exercising in dieting (why/why not)"], followUp: "Do you think school canteens serve healthy enough food? Why?" },
    b: { topic: "Favourite e-shopping platform", prompts: ["What your favourite platform is", "Why you like this particular platform", "The best time to shop online", "Whether online shopping has changed our lifestyles (why/why not)"], followUp: "Have you ever fallen for a sale and overspent? What happened?" },
  },
  {
    state: "Kedah Set 3",
    a: { topic: "A friend you admire most", prompts: ["Why you admire him/her", "What your friend is good at", "How your friend has influenced you", "What we can do to maintain good relationships with friends"], followUp: "Do you think friends influence your behaviour? How?" },
    b: { topic: "Preferred social media", prompts: ["What the social media is", "Why you prefer to use it", "What benefits you gain from it", "How to be a wise social media user"], followUp: "Have you ever taken a break from social media? How did it feel?" },
  },
  {
    state: "Kedah Set 4",
    a: { topic: "Smartphones", prompts: ["The features of smartphones that you like", "The benefits of using smartphones", "Activities you can do using smartphones", "If smartphones should be allowed in classrooms (why/why not)"], followUp: "What is the first thing you do when you pick up your phone?" },
    b: { topic: "Favourite video game", prompts: ["What your favourite video game is", "Why you like this game", "Lessons learned from this game", "Whether playing video games benefits students (why/why not)"], followUp: "How many hours a week do you spend gaming? Is that too much?" },
  },
  {
    state: "Kedah Set 5",
    a: { topic: "Shopping at a mall", prompts: ["Which mall you prefer to go to", "What item you would like to buy", "What you like about shopping at a mall", "If shopping at a mall is better than shopping online (why/why not)"], followUp: "What do you usually do at a mall besides shopping?" },
    b: { topic: "Photography", prompts: ["What gadgets you use to take photos", "Why you like to take photos", "Where you normally share photos with others (why)", "If it is better to use filters when taking photos (why/why not)"], followUp: "Do you think people take too many photos instead of enjoying the moment? Why?" },
  },
  {
    state: "Kedah Set 6",
    a: { topic: "Your biggest fear", prompts: ["What your biggest fear is", "Why you feel that way", "What you would do to overcome your fear", "If it is important for people to face their fears (why/why not)"], followUp: "Have you ever faced a fear and succeeded? What happened?" },
    b: { topic: "Gotong-royong activity", prompts: ["When it was held", "Why it was held", "How to encourage students to join gotong-royong", "If schools should organise gotong-royong regularly (why/why not)"], followUp: "Do you think community spirit is strong in Malaysia today? Why?" },
  },
  {
    state: "SMKA Set 1",
    a: { topic: "Saving accounts", prompts: ["What a saving account is for", "Why is it important to have one", "If it is beneficial for you to have one (why/why not)", "Why teenagers should open a saving account"], followUp: "What are you currently saving for?" },
    b: { topic: "A moment that made you laugh a lot", prompts: ["When and where it was", "Who you were with", "A description of the situation", "Why you thought it was funny"], followUp: "Do you prefer watching comedy or action? Why?" },
  },
  {
    state: "SMKA Set 2",
    a: { topic: "Future career", prompts: ["What your career is", "Why you choose that career", "What skills you need for the career", "What will you do for our country with that career"], followUp: "Do you think your SPM results will determine your future? Why?" },
    b: { topic: "E-wallet", prompts: ["What is an e-wallet", "What are examples of e-wallet", "Whether you like to have one (why/why not)", "Why people should use them wisely"], followUp: "Do you prefer paying with cash or e-wallet? Why?" },
  },
  {
    state: "SMKA Set 3",
    a: { topic: "A time you waited", prompts: ["What was the occasion", "Why you needed to wait", "How long you waited", "How you felt about waiting"], followUp: "Are you a patient person? What tests your patience?" },
    b: { topic: "Shopping experience", prompts: ["Where do you normally shop", "What items you normally buy", "If you enjoyed it (why/why not)", "Why shopping is a popular activity"], followUp: "Do you compare prices before buying or buy on impulse?" },
  },
  {
    state: "SMKA Set 4",
    a: { topic: "Items bought during sales and promotions", prompts: ["What the item(s) was", "How much it cost you", "Was it worth your money", "How you feel about shopping during sales and promotions"], followUp: "Do you think sales trick people into buying things they don't need?" },
    b: { topic: "Favourite reality show", prompts: ["What is the name of the show", "Who is your favourite star/character (why)", "When do you watch it", "What values you have learned from it"], followUp: "Do you think reality shows are real or scripted? Why?" },
  },
  {
    state: "SMKA Set 5",
    a: { topic: "A part-time job you would like to try", prompts: ["What the job is", "Where you want to work", "Why you choose the part-time job", "If it is suitable for students to have part-time jobs (why/why not)"], followUp: "What is the most important thing you'd gain from a part-time job?" },
    b: { topic: "My favourite song", prompts: ["What is the title of the song", "What is the song about", "Why you like the song", "What do you learn from it"], followUp: "Does music help you study or distract you? Why?" },
  },
]

// Part 3: Collaborative Task — discussion question + points + HOTS opinion
export const part3Sets = [
  { question: "Why teenagers commit crime?", points: ["Peer pressure", "Lack of parental supervision", "Depression", "Poverty", "Lack of positive role models", "Physical abuse"], hots: "What can parents and communities do to help reduce crime among teenagers?", state: "Perlis Set 1" },
  { question: "Why teenagers should do outdoor activities?", points: ["Get better sleep", "Improve mental health", "Improve physical health", "Reduce the risk of diseases", "Develop new hobbies", "Connect with people"], hots: "How can outdoor activities help to mould teenagers' personality?", state: "Perlis Set 2" },
  { question: "How to love ourselves?", points: ["Get enough sleep", "Have a good hobby", "Practise healthy lifestyle", "Connect with family and friends", "Connect with nature", "Put yourself first"], hots: "In what ways lack of self-care can affect oneself?", state: "Perlis Set 3" },
  { question: "How shopping works as retail therapy?", points: ["Uplift mood", "Social interaction", "Satisfaction", "Entertainment", "Self-reward", "Stress reliever"], hots: "How can teenagers control themselves from becoming shopaholics?", state: "Perlis Set 4" },
  { question: "How to make a content go viral?", points: ["Use various social media platforms", "Multiple postings", "Define target audience", "Easily shareable", "Collaborate with other influencers", "Strong visual and creativity"], hots: "In what ways do social media contents influence teenagers?", state: "Perlis Set 5" },
  { question: "Ways to reduce pollution", points: ["Organise awareness campaign", "Impose higher fines", "Ban plastics", "Reduce, reuse, recycle", "Use public transport", "Educate younger generation"], hots: "How does industrialisation affect the environment?", state: "Kelantan Set 1" },
  { question: "Ways to promote tourism in Malaysia", points: ["Tour packages", "Posters on billboards", "Better transports", "Cheaper accommodation", "Better facilities in public areas", "Social media"], hots: "How can Malaysians benefit from the tourism industry?", state: "Kelantan Set 2" },
  { question: "Ways to help a friend in need", points: ["Talk in private", "Get in touch with his/her family", "Be a good listener", "Offer emotional support", "Give advice", "Inform counsellor"], hots: "Would you help a stranger? Why?", state: "Kelantan Set 3" },
  { question: "Ways to keep the environment green", points: ["Raise awareness", "Limit plastic usage", "Reuse, reduce, recycle", "Plant more trees", "Support public transportation", "Impose stringent laws"], hots: "How can parents educate green environment to their children?", state: "Kelantan Set 4" },
  { question: "Ways to attract customers", points: ["Offer affordable and quality products", "Utilise social media", "Offer free gifts", "Provide discounts", "Collaborate with influencers", "Provide excellent customer service"], hots: "In your opinion, why must we buy local products?", state: "Kelantan Set 5" },
  { question: "Ways to help a friend in studies", points: ["Watch educational videos", "Form a study group", "Exchange notes", "Share motivational videos", "Offer study tips", "Work in pairs"], hots: "To what extent do you think every individual needs support from others to be successful?", state: "Kelantan Set 6" },
  { question: "How students should manage their time?", points: ["Plan your day", "Have enough sleep", "Take a break", "Start early", "Avoid multitasking", "Be focused"], hots: "In what ways does advanced technology influence students' daily routines?", state: "Terengganu Set 1" },
  { question: "Why do people become content creators?", points: ["Gain popularity", "Show creativity", "Motivate others", "Share information", "Build self-confidence", "Earn income"], hots: "How does the advancement of digital platforms affect people's lives?", state: "Terengganu Set 2" },
  { question: "Why is gardening good for us?", points: ["Source of food", "Teach patience", "A form of exercise", "Strengthen relationships", "Lower stress level", "Help mother earth"], hots: "To what extent can a hobby become a source of income?", state: "Terengganu Set 3" },
  { question: "How would you spend your time after SPM?", points: ["Work", "Computer course", "Travel", "Relax", "Cooking lessons", "Driving license"], hots: "In what ways can teenagers make full use of their free time?", state: "N. Sembilan Set 1" },
  { question: "Which part-time job would you choose and why?", points: ["Home tutor", "Retail store assistant", "Fast food worker", "Waiter / waitress", "Café barista", "Babysitter / petsitter"], hots: "To what extent would you spend time doing part-time jobs?", state: "N. Sembilan Set 2" },
  { question: "Popular personal ambitions among teenagers", points: ["Best student", "Successful entrepreneur", "Popular social media influencer", "Well-known television personality", "Famous writer", "Influential person in the country"], hots: "To what extent would you try to achieve your ambition?", state: "N. Sembilan Set 3" },
  { question: "Why should we go for a walk in the park?", points: ["Relax our mind", "Beautiful scenery", "Spend time with friends", "Fresh air", "Bond with nature", "Healthy lifestyle"], hots: "In what ways can we encourage teenagers to go outdoors more often?", state: "N. Sembilan Set 4" },
  { question: "Why people should read every day?", points: ["Improves vocabulary", "Reduces stress", "Boosts creativity", "Builds knowledge", "Improves focus", "Strengthens writing"], hots: "How can we encourage teenagers to read more?", state: "SBP Set 1" },
  { question: "What are the harmful effects of open burning?", points: ["Air pollution", "Health hazards", "Global warming", "Loss of biodiversity", "Soil degradation", "Visibility issues"], hots: "What steps should the government take to prevent open burning?", state: "SBP Set 2" },
  { question: "What are the benefits of technology?", points: ["Access to information", "Better communication", "Improved healthcare", "Easier daily tasks", "Entertainment options", "Educational tools"], hots: "Does technology make people lazier? Why?", state: "SBP Set 3" },
  { question: "Why teenagers should limit their screen time?", points: ["Eye strain", "Poor sleep quality", "Reduces physical activity", "Affects mental health", "Decreases productivity", "Weakens social skills"], hots: "Is it realistic to expect teenagers to limit screen time? Why?", state: "Pahang Set 1" },
  { question: "Ways to express your love", points: ["Spend quality time", "Give thoughtful gifts", "Acts of service", "Words of affirmation", "Physical affection", "Listen actively"], hots: "Why is it important to express love to family members?", state: "Pahang Set 2" },
  { question: "Benefits of festivals in Malaysia", points: ["Promote unity", "Boost tourism", "Preserve culture", "Strengthen family bonds", "Support local businesses", "Foster understanding"], hots: "Should all Malaysians celebrate each other's festivals? Why?", state: "Pahang Set 3" },
  { question: "Ways to stay safe online", points: ["Use strong passwords", "Avoid sharing personal info", "Verify sources", "Update software regularly", "Be cautious of strangers", "Report cyberbullying"], hots: "Should the government control internet use? Why?", state: "Pahang Set 4" },
  { question: "Ways to improve cultural awareness among teenagers", points: ["Food festivals", "Fashion shows", "Social media sharing", "Celebrations", "Music", "Language learning"], hots: "Cultural awareness should be taught in school. How far do you agree?", state: "Pahang Set 5" },
  { question: "Ways to appreciate your parents", points: ["Spend time together", "Celebrate special days", "Help them at home", "Treat your parents", "Pray for them", "Create moments"], hots: "How far do you agree that teenagers should be given full freedom in making decisions?", state: "Pahang Set 6" },
  { question: "Ways to preserve traditional culture", points: ["Through education", "Conduct campaigns", "The role of media", "Practise the traditions", "Record the culture", "Sharing session"], hots: "Modern technology has left traditional practices behind. Do you agree?", state: "Johor BP Set 1" },
  { question: "Ways to stay safe when using e-payment", points: ["Use strong password", "Monitor transactions", "Secure your device", "Report unauthorised transactions", "Avoid doubtful websites", "Check app security"], hots: "Cashless payment leads people into serious debt. Do you agree?", state: "Johor BP Set 2" },
  { question: "Electronic devices that people would install at home", points: ["CCTV", "Solar panels", "Burglar alarm system", "Security screen door", "Motion sensor light", "Intercom"], hots: "In what way do electronic devices help to improve our lives?", state: "Johor BP Set 3" },
  { question: "Qualities of a good student leader", points: ["Well-disciplined", "Considerate", "Responsible", "Role model", "Trustworthy", "Good communication skills"], hots: "Good leadership in school helps one's future. Do you agree?", state: "Johor BP Set 4" },
  { question: "Why carpooling is important?", points: ["Save money", "Reduce traffic congestion", "Save time", "Get to know your friend better", "Relax and enjoy the ride", "Reduce air pollution"], hots: "Do you think carpooling reduces the selling of cars in the country?", state: "Johor TK Set 1" },
  { question: "Why people use apps in their daily lives?", points: ["Easier", "Quality of service and products", "Promotions", "Lazy", "Trend", "Convenient"], hots: "To what extent do you think apps have changed people's lifestyle?", state: "Johor TK Set 2" },
  { question: "Ways to reduce rubbish in your neighbourhood", points: ["Organise a clean-up event", "Provide more rubbish bins", "Use eco-friendly products", "Practise 3Rs", "Awareness campaign", "Law enforcement"], hots: "Do you think it is important for teenagers to care for the environment? Why?", state: "Johor TK Set 3" },
  { question: "Activities that can reduce the risk of obesity", points: ["Regular exercise", "Sufficient sleep", "Playing sports", "Limiting online or screen time", "Staying active", "Eating healthy"], hots: "To what extent does our modern lifestyle affect our health?", state: "Johor TK Set 4" },
  { question: "Factors to consider when choosing a career", points: ["Personal interests", "Relevant skills", "Expected salary", "Academic qualifications", "Personality traits", "Job demands"], hots: "Experience is more important than degrees and diplomas. Do you agree?", state: "Kedah Set 1" },
  { question: "How to encourage teenagers to do housework?", points: ["Do housework together", "Give encouraging words", "Provide financial rewards", "Allow extra time", "Give chores suitable to their age", "Create a chore list"], hots: "In this modern era, men should equally do house chores. Do you agree?", state: "Kedah Set 2" },
  { question: "Ways to be a smart shopper", points: ["Make a list", "Set a budget", "Get recommendations", "Compare prices", "Shop during sales", "Read reviews"], hots: "Social media influencers influence teenagers' shopping habits. Do you agree?", state: "Kedah Set 3" },
  { question: "How can students protect the environment?", points: ["3Rs (Reduce, Reuse, Recycle)", "Volunteer", "Shop second-hand items", "Stop using plastic bags", "Plant a tree", "Join campaigns"], hots: "Protecting Mother Nature requires strict laws by governments worldwide. Do you agree?", state: "Kedah Set 4" },
  { question: "Benefits of travelling to local destinations", points: ["Easy access to local food", "Budget friendly", "Variety of local cultures and traditions", "Affordable accommodation", "Promote local businesses", "No language barrier"], hots: "Improving public facilities in Malaysia can help boost the nation's economy. Do you agree?", state: "Kedah Set 5" },
  { question: "Problems consumers face when buying goods and services", points: ["Poor delivery service", "Hidden fees and charges", "Harmful chemicals", "Unfriendly staff or salesperson", "Low quality goods", "Scammers"], hots: "Advertisements on social media are helping people to be smart consumers. Do you agree?", state: "Kedah Set 6" },
  { question: "Aspects that have been changed by technology", points: ["Everyday lives", "Travel", "Health", "Communication", "Entertainment", "Education"], hots: "The development of technology has greatly reduced human interaction. Do you agree?", state: "SMKA Set 1" },
  { question: "Why people use public transport?", points: ["Promote local tourism", "Protect the environment", "Reduce traffic congestion", "Save money", "Save time", "Reduce air pollution"], hots: "Using public transport is better than using one's own vehicle. Do you agree?", state: "SMKA Set 2" },
  { question: "Ways to prevent crime in neighbourhood", points: ["Put up signage as warning", "Install security cameras", "Report suspicious activity", "Start community patrol", "Exercise caution when out of town", "Improve lighting on streets"], hots: "Social background influences crime rates. Do you agree?", state: "SMKA Set 3" },
  { question: "Ways to live a healthy lifestyle", points: ["Practise fitness and exercises", "Take regular measurement", "Have an active lifestyle", "Eat healthy food", "Undergo medical examination", "Visit relaxation centre"], hots: "Having a strict diet is important to maintain good health. Do you agree?", state: "SMKA Set 4" },
  { question: "What are useful ways to save our wildlife?", points: ["Recycle", "Plant more trees", "Do not buy products made from animals", "Inform and educate the public", "Create wildlife parks", "Introduce stricter law"], hots: "Replantation helps in the healing of the forest. Do you agree?", state: "SMKA Set 5" },
]
