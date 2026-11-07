import java.util.*;
class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length; // @viz init
        Integer[] order = new Integer[n]; // @viz init
        for (int i = 0; i < n; i++) order[i] = i; // @viz init
        Arrays.sort(order, (x, y) -> position[y] - position[x]); // closest to the target first // @viz init
        int fleets = 0; // @viz init
        double slowest = 0; // arrival time of the fleet just ahead // @viz init
        for (int i : order) { // @viz car
            double t = (double) (target - position[i]) / speed[i]; // @viz car
            if (t > slowest) { // it can't catch the fleet ahead: a new fleet // @viz lead
                fleets++; // @viz lead
                slowest = t; // @viz lead
            }
        }
        return fleets; // @viz return
    }
}
