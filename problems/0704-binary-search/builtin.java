import java.util.*;
class Solution {
    public int search(int[] nums, int target) {
        int i = Arrays.binarySearch(nums, target); // negative when target is missing
        return i >= 0 ? i : -1;
    }
}
