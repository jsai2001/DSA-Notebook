import java.util.*;

class Solution {
    public boolean checkValidString(String s) {
        ArrayDeque<Integer> opens = new ArrayDeque<>(), stars = new ArrayDeque<>(); // indexes of unmatched "(" and of unused "*" // @viz init
        for (int i = 0; i < s.length(); i++) { // @viz loop
            char c = s.charAt(i); // @viz loop
            if (c == '(') { // @viz open
                opens.push(i); // @viz open
            } else if (c == '*') { // @viz star
                stars.push(i); // @viz star
            } else if (!opens.isEmpty()) { // ")": match the nearest "(" first // @viz close
                opens.pop(); // @viz close
            } else if (!stars.isEmpty()) { // no "(" left: use a "*" as "(" // @viz close
                stars.pop(); // @viz close
            } else { // @viz close
                return false; // @viz close
            }
        }
        // Each leftover "(" needs a "*" AFTER it to act as ")".
        while (!opens.isEmpty() && !stars.isEmpty()) { // @viz pair
            if (opens.pop() > stars.pop()) return false; // the "*" comes first: it can't close this "(" // @viz pair
        }
        return opens.isEmpty(); // leftover "*" can just be empty // @viz return
    }
}
