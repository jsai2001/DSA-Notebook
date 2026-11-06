import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> words = new HashSet<>(wordList); // @viz init
        if (!words.contains(endWord)) { // without this, the back side would start at a word that isn't allowed // @viz init
            return 0; // @viz init
        }
        Set<String> front = new HashSet<>(List.of(beginWord)); // @viz init
        Set<String> back = new HashSet<>(List.of(endWord)); // @viz init
        words.remove(beginWord); // @viz init
        words.remove(endWord); // @viz init
        int steps = 1; // words in the ladder so far // @viz init
        while (!front.isEmpty() && !back.isEmpty()) { // @viz loop
            if (front.size() > back.size()) { // always grow the smaller side // @viz swap
                Set<String> t = front; // @viz swap
                front = back; // @viz swap
                back = t; // @viz swap
            }
            steps++; // @viz grow
            Set<String> grown = new HashSet<>(); // @viz grow
            for (String w : front) { // @viz pop
                char[] word = w.toCharArray(); // @viz pop
                for (int i = 0; i < word.length; i++) { // @viz try
                    char orig = word[i]; // @viz try
                    for (char c = 'a'; c <= 'z'; c++) { // @viz try
                        word[i] = c; // @viz try
                        String next = new String(word); // @viz try
                        if (back.contains(next)) { // the two searches meet // @viz meet
                            return steps; // @viz meet
                        }
                        if (words.remove(next)) { // @viz take
                            grown.add(next); // @viz take
                        }
                    }
                    word[i] = orig; // @viz try
                }
            }
            front = grown; // @viz next
        }
        return 0; // @viz none
    }
}
