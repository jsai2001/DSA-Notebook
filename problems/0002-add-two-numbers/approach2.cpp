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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy; // @viz init
        ListNode* tail = &dummy; // @viz init
        int carry = 0; // @viz init

        while (l1 != nullptr || l2 != nullptr || carry != 0) { // @viz loop
            int total = carry; // @viz add
            if (l1 != nullptr) { // @viz add
                total += l1->val; // @viz add
                l1 = l1->next; // @viz add
            }
            if (l2 != nullptr) { // @viz add
                total += l2->val; // @viz add
                l2 = l2->next; // @viz add
            }

            tail->next = new ListNode(total % 10); // @viz append
            tail = tail->next; // @viz append
            carry = total / 10; // @viz append
        }

        return dummy.next; // @viz return
    }
};
