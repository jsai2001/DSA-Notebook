import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean isValid(String s) {
        if (s.length() % 2 == 1) return false; // an odd length can't pair up // @viz odd
        Deque<Character> stack = new ArrayDeque<>(); // openers still waiting for their closer // @viz init
        for (char ch : s.toCharArray()) { // @viz loop
            if (ch == ')' || ch == ']' || ch == '}') { // a closer must match the most recent open bracket // @viz close
                char opener = ch == ')' ? '(' : ch == ']' ? '[' : '{'; // @viz close
                if (stack.isEmpty() || stack.peek() != opener) return false; // @viz close, mismatch
                stack.pop(); // @viz match
            } else {
                stack.push(ch); // an opener: wait for its closer // @viz open
            }
        }
        return stack.isEmpty(); // anything still open means invalid // @viz return
    }
}
