import java.util.stream.IntStream;

class Solution {
    public int longestConsecutive(int[] nums) {
        int[] v = IntStream.of(nums).distinct().sorted().toArray(); // no repeats, in order
        int best = 0;
        for (int i = 0, j; i < v.length; i = j) {
            // j = end of the run that starts at i (each next value is one more)
            for (j = i + 1; j < v.length && v[j] == v[j - 1] + 1; j++) {}
            best = Math.max(best, j - i);
        }
        return best;
    }
}
