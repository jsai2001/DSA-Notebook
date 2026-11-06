import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> unseen = new HashSet<>(wordList); // @viz init
        if (!unseen.contains(endWord)) { // @viz init
            return 0; // @viz init
        }
        unseen.remove(beginWord); // @viz init
        ArrayDeque<String> queue = new ArrayDeque<>(); // @viz init
        queue.add(beginWord); // @viz init
        int steps = 1; // words in the ladder so far // @viz init
        while (!queue.isEmpty()) { // @viz level
            for (int k = queue.size(); k > 0; k--) { // one BFS level = one more word // @viz level
                String word = queue.poll(); // @viz pop
                if (word.equals(endWord)) { // @viz found
                    return steps; // @viz found
                }
                for (Iterator<String> it = unseen.iterator(); it.hasNext();) { // compare with every word not used yet // @viz scan
                    String other = it.next(); // @viz scan
                    if (oneApart(word, other)) { // @viz scan
                        it.remove(); // mark it used when it's queued // @viz take
                        queue.add(other); // @viz take
                    }
                }
            }
            steps++; // @viz next
        }
        return 0; // @viz none
    }

    private static boolean oneApart(String a, String b) {
        int diff = 0;
        for (int i = 0; i < a.length(); i++) {
            if (a.charAt(i) != b.charAt(i) && ++diff > 1) return false;
        }
        return diff == 1;
    }
}
