
CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL
)

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
)

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL
) 

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `course_title` varchar(200) DEFAULT NULL,
  `course_price` decimal(10,2) DEFAULT NULL,
  `enrolled_at` timestamp NOT NULL DEFAULT current_timestamp()
)

CREATE TABLE `membership_plans` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `features` text DEFAULT NULL,
  `badge` varchar(100) DEFAULT NULL
)



CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL
)

CREATE TABLE `news_updates` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL
)

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
)