import java.util.Arrays;
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        int m = s1.length(); // @viz init
        char[] target = s1.toCharArray(); // @viz init
        Arrays.sort(target); // every permutation of s1 sorts to the same letters // @viz init
        for (int i = 0; i + m <= s2.length(); i++) { // every window of length m // @viz window
            char[] window = s2.substring(i, i + m).toCharArray(); // @viz window
            Arrays.sort(window); // @viz window
            if (Arrays.equals(window, target)) return true; // @viz found
        }
        return false; // @viz return
    }
}
