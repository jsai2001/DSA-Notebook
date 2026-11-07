class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length; // @viz init
        double[] time = new double[n]; // when each car would arrive alone // @viz init
        for (int i = 0; i < n; i++) time[i] = (double) (target - position[i]) / speed[i]; // @viz init
        int fleets = 0; // @viz init
        for (int i = 0; i < n; i++) { // is car i the front of its fleet? // @viz car
            boolean caught = false; // @viz car
            for (int j = 0; j < n && !caught; j++) // @viz check
                if (position[j] > position[i] && time[j] >= time[i]) caught = true; // a car ahead arrives no sooner: i catches it // @viz check
            if (!caught) fleets++; // nothing ahead slows it down: a new fleet // @viz lead
        }
        return fleets; // @viz return
    }
}
