import java.util.*;
class MedianFinder {
    private final List<Integer> nums = new ArrayList<>(); // every value, in arrival order // @viz init
    public MedianFinder() {}
    public void addNum(int num) {
        nums.add(num); // O(1) // @viz add
    }
    public double findMedian() {
        List<Integer> s = new ArrayList<>(nums); // sort a copy every time // @viz sort
        Collections.sort(s); // @viz sort
        int n = s.size(); // @viz sort
        return n % 2 == 1 ? s.get(n / 2) : (s.get(n / 2 - 1) + (double) s.get(n / 2)) / 2; // the middle, or the mean of the two middles // @viz median
    }
}
