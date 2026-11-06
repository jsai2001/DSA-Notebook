import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> words = new HashSet<>(wordList); // @viz init
        if (!words.contains(endWord)) { // @viz init
            return 0; // @viz init
        }
        words.remove(beginWord); // @viz init
        ArrayDeque<String> queue = new ArrayDeque<>(); // @viz init
        queue.add(beginWord); // @viz init
        int steps = 1; // words in the ladder so far // @viz init
        while (!queue.isEmpty()) { // @viz level
            steps++; // every word found in this level is one more step away // @viz level
            for (int k = queue.size(); k > 0; k--) { // @viz level
                char[] word = queue.poll().toCharArray(); // @viz pop
                for (int i = 0; i < word.length; i++) { // @viz try
                    char orig = word[i]; // @viz try
                    for (char c = 'a'; c <= 'z'; c++) { // @viz try
                        word[i] = c; // change one letter (in place, put back below) // @viz try
                        String next = new String(word); // @viz try
                        if (!words.remove(next)) continue; // not a word, or already used // @viz hit
                        if (next.equals(endWord)) { // @viz found
                            return steps; // @viz found
                        }
                        queue.add(next); // removed above = marked used // @viz take
                    }
                    word[i] = orig; // @viz try
                }
            }
        }
        return 0; // @viz none
    }
}
