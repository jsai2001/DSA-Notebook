import java.util.*;
class KthLargest {
    private final int k;
    private final List<Integer> nums = new ArrayList<>(); // kept sorted, smallest first // @viz init
    public KthLargest(int k, int[] nums) {
        this.k = k; // @viz init
        for (int x : nums) this.nums.add(x); // @viz init
        Collections.sort(this.nums); // @viz init
    }
    public int add(int val) {
        int i = Collections.binarySearch(nums, val); // binary search for the spot // @viz add
        nums.add(i < 0 ? -i - 1 : i, val); // then shift the rest: O(n) // @viz add
        return nums.get(nums.size() - k); // the k-th from the end // @viz answer
    }
}
