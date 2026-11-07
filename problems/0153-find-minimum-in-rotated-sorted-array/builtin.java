import java.util.Arrays;

class Solution {
    public int findMin(int[] nums) {
        return Arrays.stream(nums).min().getAsInt(); // scans everything: O(n)
    }
}
