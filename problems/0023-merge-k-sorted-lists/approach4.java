/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length == 0) return null; // k = 0: nothing to merge // @viz empty
        int step = 1; // lists[i] and lists[i + step] are the pairs to merge this round // @viz init
        while (step < lists.length) { // @viz round
            for (int i = 0; i + step < lists.length; i += 2 * step) // @viz pair
                lists[i] = mergeTwo(lists[i], lists[i + step]); // @viz pair
            step *= 2; // half as many lists, each about twice as long // @viz double
        }
        return lists[0]; // @viz return
    }

    private ListNode mergeTwo(ListNode a, ListNode b) { // Merge Two Sorted Lists (LeetCode 21)
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }
        tail.next = a != null ? a : b;
        return dummy.next;
    }
}
