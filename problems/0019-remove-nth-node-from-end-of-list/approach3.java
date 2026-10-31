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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head); // in front of head, so removing head isn't a special case // @viz dummy
        ListNode fast = dummy, slow = dummy; // @viz dummy
        for (int k = 0; k <= n; k++) fast = fast.next; // fast goes n + 1 steps ahead: n nodes between them // @viz gap
        while (fast != null) { // move both until fast falls off the end // @viz move
            fast = fast.next; // @viz move
            slow = slow.next; // @viz move
        }
        slow.next = slow.next.next; // slow is just before the target: skip it // @viz unlink
        return dummy.next; // @viz return
    }
}
