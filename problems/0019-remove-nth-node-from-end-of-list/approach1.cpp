/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        int length = 0; // @viz count
        for (ListNode* node = head; node; node = node->next) ++length; // first pass: count the nodes // @viz count
        ListNode dummy(0, head); // in front of head, so removing head isn't a special case // @viz dummy
        ListNode* prev = &dummy; // @viz dummy
        for (int k = 0; k < length - n; ++k) prev = prev->next; // second pass: stop just before the target // @viz walk
        ListNode* target = prev->next; // @viz unlink
        prev->next = target->next; // skip over the target // @viz unlink
        delete target; // @viz unlink
        return dummy.next; // @viz return
    }
};
